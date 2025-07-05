import type { FC, ReactNode, Ref } from "react";
import {
    type StyleProp,
    StyleSheet,
    TextInput,
    type TextInputProps,
    type TextStyle,
} from "react-native";

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

export interface InputBaseProps
    extends Omit<TextInputProps, "editable" | "style"> {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: ReactNode;

    disabled?: boolean;

    ref?: Ref<TextInput>;

    /**
     * Prevents auto trimming of text. (Can interfere with inputs that handle onChangeText)
     */

    containerStyle?: StyleProp<TextStyle>;
}

export const InputBase: FC<InputBaseProps> = ({
    label,
    disabled,
    containerStyle,
    multiline,
    scrollEnabled,
    onChangeText,
    ref,
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
            style={[styles.input, containerStyle]}
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
