import type React from "react";
import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { Text, type TextProps } from "./Text";

/**
 * Escapes any characters that would interfere with RegEx processing.
 */
export const EscapeForRegexProcessing = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export interface HighlightedTextStyles {
    /**
     * Font family due to weight limitations.
     */
    highlightedFontFamilyWeight: string;
}
export interface HighlightedTextProps
    extends Pick<TextProps, "variant" | "style"> {
    text?: string;
    highlight?: string;
}

export const HighlightedText: React.FunctionComponent<HighlightedTextProps> = ({
    text = "",
    highlight = "",
    style,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, {});

    const highlightedText = EscapeForRegexProcessing(highlight.toLowerCase());
    const parts = text.split(new RegExp(`(${highlightedText})`, "gi"));

    return (
        <Text style={{ display: "flex", flexDirection: "row" }}>
            {parts.map((part, idx) => (
                <Text
                    {...props}
                    key={`${part}${idx}`}
                    style={[
                        part.toLowerCase() === highlightedText
                            ? styles.highlighted
                            : styles.default,
                        style,
                    ]}
                >
                    {part}
                </Text>
            ))}
        </Text>
    );
};

HighlightedText.displayName = "HighlightedText";

const createStyles = ({
    theme: { font },
    styles: { highlightedText },
}: ThemedStyles) => {
    const styles = StyleSheet.create({
        default: {
            fontFamily: font.familyWeight.regular400,
        },
        highlighted: {
            fontFamily: highlightedText.highlightedFontFamilyWeight,
        },
    });
    return styles;
};
