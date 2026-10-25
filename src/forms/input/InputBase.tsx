import { type FC, type Ref, useState } from "react";
import { type ColorValue, TextInput, type TextInputProps } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    createFocusRingStyle,
    defineStyles,
    type FocusRingTheme,
    MAX_FONT_SIZE_MULTIPLIER,
    type PropFilter,
    useComponent,
} from "../../internal";

export type InputState = "enabled" | "disabled";
export type InputVariant = "regular" | "compact";

export interface InputBaseTheme {
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
    focusRing: FocusRingTheme;
}

export interface InputBaseProps
    extends Omit<TextInputProps, "editable" | "style"> {
    disabled?: boolean;
    readOnly?: boolean;
    variant?: InputVariant;
    theme?: DeepPartial<InputBaseTheme>;
    style?: TextInputProps["style"];
    ref?: Ref<TextInput>;
}

export const InputBase: FC<InputBaseProps> = ({
    disabled = false,
    readOnly = false,
    multiline = false,
    variant = "regular",
    scrollEnabled,
    onChangeText,
    onFocus,
    onBlur,
    ref,
    theme: themeOverrides,
    style,
    ...props
}) => {
    const [focused, setFocused] = useState(false);
    const { styles, theme } = useComponent("inputBase", {
        themeOverrides,
        props: { disabled, multiline, variant },
        createStyles,
    });

    const handleFocus: NonNullable<TextInputProps["onFocus"]> = (event) => {
        setFocused(true);
        onFocus?.(event);
    };

    const handleBlur: NonNullable<TextInputProps["onBlur"]> = (event) => {
        setFocused(false);
        onBlur?.(event);
    };

    return (
        <TextInput
            ref={ref}
            editable={!(disabled || readOnly)}
            maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
            placeholderTextColor={theme.text.placeholderColor}
            style={[
                createFocusRingStyle(theme.focusRing, focused && !disabled),
                styles.input,
                style,
            ]}
            multiline={multiline}
            scrollEnabled={scrollEnabled ?? multiline}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
        />
    );
};

const createStyles = defineStyles(
    (
        theme: InputBaseTheme,
        props: PropFilter<InputBaseProps, "disabled" | "multiline" | "variant">,
    ) => {
        const { container, text } = theme;

        return {
            input: {
                alignSelf: "stretch",
                minWidth: 0,
                height: props.multiline
                    ? undefined
                    : container.height[props.variant],
                minHeight: container.height[props.variant],
                padding: container.padding,
                borderRadius: container.borderRadius,
                backgroundColor:
                    container.backgroundColor[
                        props.disabled ? "disabled" : "enabled"
                    ],
                fontSize: text.fontSize,
                fontFamily: text.fontFamily,
                color: text.color[props.disabled ? "disabled" : "enabled"],
                opacity: props.disabled ? 0.5 : 1,
            },
        };
    },
);
