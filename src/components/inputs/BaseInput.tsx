import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TextInputProps,
    StyleProp,
    ViewStyle,
    NativeSyntheticEvent,
    TextInputFocusEventData,
} from "react-native";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { Text } from "../Text";

export type InputWidth = "small" | "large" | "full";

export interface BaseInputStyles {
    height: number;
    width: {
        [key in InputWidth]: string | number;
    };
    borderRadius: number;
    padding: number;
    fontSize: number;
    multilineLineHeight: number;
    fontFamilyWeight: string;
    textColor: string;
    placeholderTextColor: string;
    disabledTextColor: string;
    backgroundColor: string;
    backgroundColorDisabled: string;
    labelMarginBottom: number;
}

export interface BaseInputProps extends Omit<TextInputProps, "editable"> {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: React.ReactNode;

    width?: InputWidth;
    disabled?: boolean;

    /**
     * Input element component.
     */
    inputElement?: React.ReactNode;
    panelElement?: React.ReactNode;
    modalElement?: React.ReactNode;

    containerStyle?: StyleProp<ViewStyle>;
}

export const BaseInput = React.forwardRef<TextInput, BaseInputProps>(
    (
        {
            label,
            width,
            disabled,
            inputElement,
            panelElement,
            modalElement,
            style,
            containerStyle,
            multiline,
            scrollEnabled,
            onBlur,
            onFocus,
            ...props
        },
        ref,
    ) => {
        const styles = useThemedStyles(createStyles, { width, disabled, multiline });
        const {
            styles: { baseInput },
        } = useTheme();

        const { shouldHandleKeyboardEvents } = useBottomSheetInternal(true) ?? {};

        const handleOnFocus = React.useCallback(
            (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
                if (shouldHandleKeyboardEvents) {
                    shouldHandleKeyboardEvents.value = true;
                }
                onFocus?.(e);
            },
            [onFocus, shouldHandleKeyboardEvents],
        );
        const handleOnBlur = React.useCallback(
            (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
                if (shouldHandleKeyboardEvents) {
                    shouldHandleKeyboardEvents.value = false;
                }
                onBlur?.(e);
            },
            [onBlur, shouldHandleKeyboardEvents],
        );

        React.useEffect(() => {
            return () => {
                if (shouldHandleKeyboardEvents) {
                    shouldHandleKeyboardEvents.value = false;
                }
            };
        }, [shouldHandleKeyboardEvents]);

        return (
            <>
                <View style={[styles.container, containerStyle]}>
                    {label && (
                        <View style={styles.label}>
                            {typeof label === "string" ? <Text variant="label">{label}</Text> : label}
                        </View>
                    )}
                    {inputElement ? (
                        inputElement
                    ) : (
                        <TextInput
                            ref={ref}
                            editable={!disabled}
                            placeholderTextColor={baseInput.placeholderTextColor}
                            style={[styles.input, style]}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            multiline={multiline}
                            scrollEnabled={scrollEnabled ?? false}
                            {...props}
                        />
                    )}
                    {panelElement}
                </View>
                {modalElement}
            </>
        );
    },
);

BaseInput.displayName = "BaseInput";

const createStyles = (
    { styles: { baseInput } }: ThemedStyles,
    { width = "full", disabled, multiline = false }: BaseInputProps,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            width: baseInput.width[width],
        },
        label: {
            marginBottom: baseInput.labelMarginBottom,
        },
        input: {
            height: multiline ? "auto" : baseInput.height,
            borderRadius: baseInput.borderRadius,
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : baseInput.backgroundColor,
            padding: baseInput.padding,
            fontSize: baseInput.fontSize,
            lineHeight: multiline ? baseInput.multilineLineHeight : undefined,
            fontFamily: baseInput.fontFamilyWeight,
            color: baseInput.textColor,
        },
    });
