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
import { Icon } from "../Icon";

import { InputWidth } from "./types";

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
    labelMargin: number;
    mandatoryColor: string;
    errorColor: string;
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

    helpText?: string;
    hasError?: boolean;
    mandatory?: boolean;

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
            helpText,
            mandatory,
            inputElement,
            panelElement,
            modalElement,
            style,
            containerStyle,
            multiline,
            scrollEnabled,
            hasError,
            onBlur,
            onFocus,
            ...props
        },
        ref,
    ) => {
        const styles = useThemedStyles(createStyles, { width, disabled, multiline });
        const {
            styles: { baseInput, text },
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
                    {(mandatory || label) && (
                        <View style={styles.labelContainer}>
                            {mandatory && (
                                <Text variant="label" style={styles.mandatoryIndicator}>
                                    {"\u2022"}
                                </Text>
                            )}
                            {label && (typeof label === "string" ? <Text variant="label">{label}</Text> : label)}
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
                    {(helpText || hasError) && (
                        <View style={styles.helpText}>
                            {hasError && (
                                <Icon
                                    size={text.fontFamilySize.caption}
                                    iconName="exclamationcircle"
                                    style={styles.errorIndicator}
                                />
                            )}
                            {helpText &&
                                (typeof helpText === "string" ? <Text variant="caption">{helpText}</Text> : helpText)}
                        </View>
                    )}
                </View>
                {modalElement}
            </>
        );
    },
);

(BaseInput as React.FunctionComponent).displayName = "BaseInput";

const createStyles = (
    { styles: { baseInput }, theme: { padding } }: ThemedStyles,
    { width = "full", disabled, multiline = false }: BaseInputProps,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            width: baseInput.width[width],
        },
        labelContainer: {
            flexDirection: "row",
            gap: padding.tiny,
            marginBottom: baseInput.labelMargin,
        },
        mandatoryIndicator: {
            color: baseInput.mandatoryColor,
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
        helpText: {
            flexDirection: "row",
            gap: padding.tiny,
            marginTop: baseInput.labelMargin,
        },
        errorIndicator: {
            color: baseInput.errorColor,
        },
    });
