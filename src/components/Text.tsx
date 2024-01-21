import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";

import { ThemedStyles, useThemedStyles } from "../hooks";

export type TextVariant = "display" | "title" | "heading" | "label" | "body" | "caption" | "bodyEmphasized";

export interface TextStyles {
    textColor: string;
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: {
        [key in TextVariant]: string;
    };
    fontFamilySize: {
        [key in TextVariant]: number;
    };
    lineHeight: {
        [key in TextVariant]: number;
    };
}

export interface TextProps extends RNTextProps {
    variant?: TextVariant;
    children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ variant = "body", style, children, ...props }) => {
    const styles = useThemedStyles(createStyles, { variant });

    return (
        <RNText {...props} style={[styles.text, style]}>
            {children}
        </RNText>
    );
};

Text.displayName = "Text";

const createStyles = ({ styles: { text } }: ThemedStyles, { variant = "body" }: Partial<TextProps>) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: text.fontFamilyWeight[variant],
            fontSize: text.fontFamilySize[variant],
            color: text.textColor,
            lineHeight: text.lineHeight[variant],
        },
    });
    return styles;
};
