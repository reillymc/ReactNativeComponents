import type { FC, Ref } from "react";
import {
    type ColorValue,
    StyleSheet,
    TextInput,
    type TextInputProps,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { MAX_FONT_SIZE_MULTIPLIER } from "../../common";
import { type ThemedStyles, useThemedStyles } from "../../hooks";

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
    style: styleOverrides,
    inputStyle,
    ...props
}) => {
    const [styles, { style }] = useThemedStyles("inputBase", createStyles, {
        styles: { inputBase: styleOverrides },
        props: { disabled, multiline, variant },
    });

    return (
        <TextInput
            ref={ref}
            editable={!disabled}
            maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
            placeholderTextColor={style.text.placeholderColor}
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
) => {
    const { borderRadius, padding, height } = inputBase.container;

    return StyleSheet.create({
        input: {
            alignSelf: "stretch",
            minWidth: 0,
            height: multiline ? undefined : height[variant],
            minHeight: height[variant],
            padding,
            borderRadius,
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            fontSize: inputBase.text.fontSize,
            fontFamily: inputBase.text.fontFamily,
            color: inputBase.text.color[disabled ? "disabled" : "enabled"],
        },
    });
};
