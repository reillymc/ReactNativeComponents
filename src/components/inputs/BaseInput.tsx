import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, View, TextInput as RNTextInput, TextInputProps as RNTextInputProps } from "react-native";

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
    fontFamilyWeight: string;
    textColor: string;
    placeholderTextColor: string;
    disabledTextColor: string;
    backgroundColor: string;
    backgroundColorDisabled: string;
    labelMarginBottom: number;
}

export interface BaseInputProps extends Omit<RNTextInputProps, "editable"> {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: React.ReactNode;

    width?: InputWidth;
    disabled?: boolean;

    modalSupport?: boolean;

    /**
     * Input element component.
     */
    inputElement?: React.ReactNode;
    panelElement?: React.ReactNode;
    modalElement?: React.ReactNode;
}

export const BaseInput = React.forwardRef<RNTextInput, BaseInputProps>(
    ({ label, width, disabled, modalSupport, inputElement, panelElement, modalElement, style, ...props }, ref) => {
        const styles = useThemedStyles(createStyles, { width, disabled });
        const {
            styles: { baseInput },
        } = useTheme();

        const Component = modalSupport ? BottomSheetTextInput : RNTextInput;

        return (
            <>
                <View style={styles.container}>
                    {label && (
                        <View style={styles.label}>
                            {typeof label === "string" ? <Text variant="label">{label}</Text> : label}
                        </View>
                    )}
                    {inputElement ? (
                        inputElement
                    ) : (
                        <Component
                            ref={ref as any}
                            editable={!disabled}
                            placeholderTextColor={baseInput.placeholderTextColor}
                            style={[styles.input, style]}
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

const createStyles = ({ styles: { baseInput } }: ThemedStyles, { width = "full", disabled }: BaseInputProps) =>
    StyleSheet.create({
        container: {
            display: "flex",

            width: baseInput.width[width],
        },
        label: {
            marginBottom: baseInput.labelMarginBottom,
        },
        input: {
            height: baseInput.height,
            borderRadius: baseInput.borderRadius,
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : baseInput.backgroundColor,
            padding: baseInput.padding,
            fontSize: baseInput.fontSize,
            fontFamily: baseInput.fontFamilyWeight,
            color: baseInput.textColor,
        },
    });
