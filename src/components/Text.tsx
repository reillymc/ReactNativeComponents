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
    alignLineHeightWithVariant?: TextVariant;
    compactLineHeight?: boolean;
    children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
    variant = "body",
    compactLineHeight,
    alignLineHeightWithVariant,
    style,
    children,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, { variant, compactLineHeight, alignLineHeightWithVariant });

    return (
        <RNText {...props} style={[styles.text, style]}>
            {children}
        </RNText>
    );
};

Text.displayName = "Text";

const createStyles = (
    { styles: { text } }: ThemedStyles,
    { variant = "body", compactLineHeight = false, alignLineHeightWithVariant = variant }: Partial<TextProps>,
) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: text.fontFamilyWeight[variant],
            fontSize: text.fontFamilySize[variant],
            color: text.textColor,
            lineHeight: compactLineHeight
                ? text.fontFamilySize[alignLineHeightWithVariant]
                : text.lineHeight[alignLineHeightWithVariant],
        },
    });
    return styles;
};
