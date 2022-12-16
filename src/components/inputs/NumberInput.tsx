import React from "react";
import { StyleSheet, TextInput as RNTextInput } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { TextInput, TextInputProps } from "./TextInput";
import { BaseInput } from "./BaseInput";

export interface NumberInputStyles {}

export interface NumberInputProps extends TextInputProps {}

export const NumberInput = React.forwardRef<RNTextInput, NumberInputProps>(
    ({ style, width, disabled = false, modalSupport, label, onChangeText, ...props }, ref) => {
        const styles = useThemedStyles(createStyles, { width, disabled });
        const {
            styles: { common },
        } = useTheme();

        const handleChangeText = React.useCallback(
            (text: string) => {
                if (onChangeText) {
                    onChangeText(text);
                }
            },
            [onChangeText],
        );

        return (
            <BaseInput label={label}>
                <TextInput
                    ref={ref as any}
                    disabled={disabled}
                    placeholderTextColor={common.input.placeholderTextColor}
                    style={[styles.input, style]}
                    keyboardType="numeric"
                    {...props}
                    onChangeText={handleChangeText}
                />
            </BaseInput>
        );
    },
);

NumberInput.displayName = "NumberInput";

const createStyles = ({ styles: { common } }: ThemedStyles, { width = "large", disabled }: NumberInputProps) =>
    StyleSheet.create({
        input: {
            display: "flex",
            width: common.input.width[width],
            minWidth: common.input.width[width],
            height: common.input.height,
            borderRadius: common.input.borderRadius,
            backgroundColor: disabled ? common.input.backgroundColorDisabled : common.input.backgroundColor,
            padding: common.input.padding,
            fontSize: common.input.fontSize,
            fontFamily: common.input.fontFamilyWeight,
            color: common.input.textColor,
        },
    });
