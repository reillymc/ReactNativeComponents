import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

import { ThemeContext, useThemedStyles } from "./ThemeProvider";

export type TitleStyles = {
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
};

interface TitleProps {
    style?: TextStyle;
    children?: string;
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
    const styles = useThemedStyles(createStyles, {});

    return <Text style={[styles.title, style]}>{children}</Text>;
};

Title.displayName = "Title";

export { Title };

const createStyles = ({ styles: { title }, theme: { font } }: ThemeContext) =>
    StyleSheet.create({
        title: {
            fontFamily: title.fontFamilyWeight,
            fontSize: font.size.title,
        },
    });
