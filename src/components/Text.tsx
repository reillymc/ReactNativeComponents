import React from "react";
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from "react-native";

import { ThemedStyles, useThemedStyles } from "../hooks";

export type TextVariant = "title" | "heading" | "body";

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
}

export interface TextProps {
    variant?: TextVariant;
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ variant = "body", style, children }) => {
    const styles = useThemedStyles(createStyles, { variant });

    return <RNText style={[styles.text, style]}>{children}</RNText>;
};

Text.displayName = "Text";

const createStyles = ({ styles: { text } }: ThemedStyles, { variant = "body" }: Partial<TextProps>) =>
    StyleSheet.create({
        text: {
            fontFamily: text.fontFamilyWeight[variant],
            fontSize: text.fontFamilySize[variant],
            color: text.textColor,
        },
    });
