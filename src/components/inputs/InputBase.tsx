import type { FC, ReactNode, Ref } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";

export interface InputBaseStyles {
    height: number;

    borderRadius: number;
    padding: number;
    fontSize: number;
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

export interface InputBaseProps extends Omit<TextInputProps, "editable"> {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: ReactNode;

    disabled?: boolean;

    ref?: Ref<TextInput>;
}

export const InputBase: FC<InputBaseProps> = ({
    label,
    disabled,
    multiline,
    scrollEnabled,
    onChangeText,
    ref,
    style,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, {
        disabled,
        multiline,
    });
    const {
        styles: { baseInput },
    } = useTheme();

    return (
        <TextInput
            ref={ref}
            editable={!disabled}
            placeholderTextColor={baseInput.placeholderTextColor}
            style={[styles.input, style]}
            multiline={multiline}
            scrollEnabled={scrollEnabled ?? false}
            onChangeText={onChangeText}
            {...props}
        />
    );
};

const createStyles = (
    { styles: { baseInput } }: ThemedStyles,
    { disabled, multiline = false }: InputBaseProps,
) =>
    StyleSheet.create({
        input: {
            height: multiline ? "auto" : baseInput.height,
            borderRadius: baseInput.borderRadius,
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : baseInput.backgroundColor,
            padding: baseInput.padding,
            fontSize: baseInput.fontSize,
            fontFamily: baseInput.fontFamilyWeight,
            color: baseInput.textColor,
        },
    });
