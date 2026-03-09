import type { FC, Ref } from "react";
import {
    type ColorValue,
    StyleSheet,
    TextInput,
    type TextInputProps,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";

export type InputState = "enabled" | "disabled";
export type InputVariant = "regular" | "compact";

export interface InputBaseStyles {
    container: {
        height: Record<InputVariant, number>;
        padding: number;
        borderRadius: number;
        backgroundColor: Record<InputState, ColorValue>;
    };
    text: {
        fontSize: number;
        fontFamily: string;
        color: Record<InputState, ColorValue>;
        placeholderColor: ColorValue;
    };
}

export interface InputBaseProps
    extends Omit<TextInputProps, "editable" | "style"> {
    disabled?: boolean;
    variant?: InputVariant;
    style?: DeepPartial<InputBaseStyles>;
    inputStyle?: TextInputProps["style"];
    ref?: Ref<TextInput>;
}

export const InputBase: FC<InputBaseProps> = ({
    disabled = false,
    multiline = false,
    variant = "regular",
    scrollEnabled,
    onChangeText,
    ref,
    style,
    inputStyle,
    ...props
}) => {
    const [styles, { inputBase }] = useThemedStylesWithOverride(
        createStyles,
        { inputBase: style },
        { disabled, multiline, variant },
    );

    return (
        <TextInput
            ref={ref}
            editable={!disabled}
            placeholderTextColor={inputBase.text.placeholderColor}
            style={[styles.input, inputStyle]}
            multiline={multiline}
            scrollEnabled={scrollEnabled ?? false}
            onChangeText={onChangeText}
            {...props}
        />
    );
};

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    {
        disabled,
        multiline,
        variant,
    }: Required<Pick<InputBaseProps, "multiline" | "disabled" | "variant">>,
) =>
    StyleSheet.create({
        input: {
            height: multiline ? "auto" : inputBase.container.height[variant],
            minHeight: multiline
                ? inputBase.container.height[variant]
                : undefined,
            borderRadius: inputBase.container.borderRadius,
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            padding: inputBase.container.padding,
            fontSize: inputBase.text.fontSize,
            fontFamily: inputBase.text.fontFamily,
            color: inputBase.text.color[disabled ? "disabled" : "enabled"],
        },
    });
