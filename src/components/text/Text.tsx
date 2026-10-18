import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    Text as RnText,
    type TextProps as RnTextProps,
    StyleSheet,
    type TextStyle,
} from "react-native";

import { MAX_FONT_SIZE_MULTIPLIER } from "../../common";
import { type ThemedStyles, useThemedStyles } from "../../hooks";

export type TextVariant =
    | "display"
    | "title"
    | "heading"
    | "label"
    | "body"
    | "caption";

export interface TextStyles {
    color: ColorValue;
    font: {
        [Variant in TextVariant]: {
            family: string;
            weight: TextStyle["fontWeight"];
            size: number;
        };
    };
}

export interface TextProps extends RnTextProps {
    variant?: TextVariant;
    children?: ReactNode;
}

export const Text: FC<TextProps> = ({
    variant = "body",
    style,
    children,
    ...props
}) => {
    const [styles] = useThemedStyles("text", createStyles, {
        props: { variant },
    });

    return (
        <RnText
            maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
            {...props}
            style={[styles.text, style]}
        >
            {children}
        </RnText>
    );
};

const createStyles = (
    { styles: { text } }: ThemedStyles,
    { variant = "body" }: Partial<TextProps>,
) =>
    StyleSheet.create({
        text: {
            fontFamily: text.font[variant].family,
            fontWeight: text.font[variant].weight,
            fontSize: text.font[variant].size,
            color: text.color,
        },
    });
