import type React from "react";
import {
    Text as RnText,
    type TextProps as RnTextProps,
    StyleSheet,
} from "react-native";

import { type ThemedStyles, useThemedStyles } from "../hooks";

export type TextVariant =
    | "display"
    | "title"
    | "heading"
    | "label"
    | "body"
    | "caption"
    | "bodyEmphasized";

export interface TextStyles {
    textColor: string;
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: {
        [Variant in TextVariant]: string;
    };
    fontFamilySize: {
        [Variant in TextVariant]: number;
    };
}

export interface TextProps extends RnTextProps {
    variant?: TextVariant;
    children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
    variant = "body",
    style,
    children,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, { variant });

    return (
        <RnText {...props} style={[styles.text, style]}>
            {children}
        </RnText>
    );
};

Text.displayName = "Text";

const createStyles = (
    { styles: { text } }: ThemedStyles,
    { variant = "body" }: Partial<TextProps>,
) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: text.fontFamilyWeight[variant],
            fontSize: text.fontFamilySize[variant],
            color: text.textColor,
        },
    });
    return styles;
};
