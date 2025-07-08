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

export interface InputBaseStyles {
    container: {
        height: number;
        padding: number;
        borderRadius: number;
        backgroundColor: Record<InputState, ColorValue>;
    };
    text: {
        fontSize: number;
        fontFamilyWeight: string;
        color: Record<InputState, ColorValue>;
        placeholderColor: ColorValue;
    };
}

export interface InputBaseProps
    extends Omit<TextInputProps, "editable" | "style"> {
    disabled?: boolean;
    style?: DeepPartial<InputBaseStyles>;
    inputStyle?: TextInputProps["style"];
    ref?: Ref<TextInput>;
}

export const InputBase: FC<InputBaseProps> = ({
    disabled = false,
    multiline = false,
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
        { disabled, multiline },
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
    }: Required<Pick<InputBaseProps, "multiline" | "disabled">>,
) =>
    StyleSheet.create({
        input: {
            height: multiline ? "auto" : inputBase.container.height,
            minHeight: multiline ? inputBase.container.height : undefined,
            borderRadius: inputBase.container.borderRadius,
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            padding: inputBase.container.padding,
            fontSize: inputBase.text.fontSize,
            fontFamily: inputBase.text.fontFamilyWeight,
            color: inputBase.text.color[disabled ? "disabled" : "enabled"],
        },
    });
