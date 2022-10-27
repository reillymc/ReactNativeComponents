import React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { ThemedStyles, useThemedStyles } from "../hooks";

import { Text } from "./Text";

export interface HighlightedTextStyles {
    /**
     * Font family due to weight limitations.
     */
    highlightedFontFamilyWeight: string;
}
interface HighlightedTextProps {
    text?: string;
    highlight?: string;
    style?: StyleProp<TextStyle>;
}

const HighlightedText: React.FunctionComponent<HighlightedTextProps> = ({ text = "", highlight = "", style }) => {
    const styles = useThemedStyles(createStyles, {});

    const highlightedText = highlight?.toLowerCase();
    const parts = text.split(new RegExp(`(${highlightedText})`, "gi"));

    return (
        <View style={{ display: "flex", flexDirection: "row" }}>
            {parts.map((part, idx) => (
                <Text
                    key={`${part}${idx}`}
                    style={[part.toLowerCase() === highlightedText ? styles.highlighted : styles.default, style]}
                >
                    {part}
                </Text>
            ))}
        </View>
    );
};

HighlightedText.displayName = "HighlightedText";

export { HighlightedText as default, HighlightedText, HighlightedTextProps };

const createStyles = ({ theme: { font }, styles: { highlightedText } }: ThemedStyles) =>
    StyleSheet.create({
        default: {
            fontFamily: font.familyWeight.regular400,
        },
        highlighted: {
            fontFamily: highlightedText.highlightedFontFamilyWeight,
        },
    });
