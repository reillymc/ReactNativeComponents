import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

import { ThemeContext, useThemedStyles } from "./ThemeProvider";

export type HeadingStyles = {
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
};

interface HeadingProps {
    heading: string;

    style?: TextStyle;
}

const Heading: React.FC<HeadingProps> = ({ heading, style }) => {
    const styles = useThemedStyles(createStyles, {});

    return <Text style={[styles.heading, style]}>{heading}</Text>;
};

Heading.displayName = "Heading";

export { Heading };

const createStyles = ({ styles: { heading }, theme: { font } }: ThemeContext) =>
    StyleSheet.create({
        heading: {
            fontFamily: heading.fontFamilyWeight,
            fontSize: font.size.heading,
        },
    });
