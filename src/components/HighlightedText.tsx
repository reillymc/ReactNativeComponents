import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HighlightedTextProps {
    text?: string;
    highlight?: string;
}

const HighlightedText: React.FunctionComponent<HighlightedTextProps> = ({ text = "", highlight = "" }) => {
    const highlightedText = highlight?.toLowerCase();
    const parts = text.split(new RegExp(`(${highlightedText})`, "gi"));
    return (
        <View style={{ display: "flex", flexDirection: "row" }}>
            {parts.map((part, idx) => (
                <Text
                    key={`${part}${idx}`}
                    style={part.toLowerCase() === highlightedText ? Styles.highlighted : Styles.default}
                >
                    {part}
                </Text>
            ))}
        </View>
    );
};

HighlightedText.displayName = "HighlightedText";

export { HighlightedText as default, HighlightedText, HighlightedTextProps };

const Styles = StyleSheet.create({
    default: {
        fontWeight: "400",
    },
    highlighted: {
        fontWeight: "700",
    },
});
