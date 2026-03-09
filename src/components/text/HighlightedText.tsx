import type React from "react";
import { StyleSheet, type TextStyle } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useThemedStylesWithOverride } from "../../hooks";
import { Text, type TextProps, type TextVariant } from "./Text";

/**
 * Escapes any characters that would interfere with RegEx processing.
 */
export const EscapeForRegexProcessing = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export interface HighlightedTextStyles {
    highlightedWeight: Record<TextVariant, TextStyle["fontWeight"]>;
}
export interface HighlightedTextProps extends Pick<TextProps, "variant"> {
    text?: string;
    textStyles?: TextProps["style"];
    style?: DeepPartial<HighlightedTextStyles>;
    highlight?: string;
}

export const HighlightedText: React.FunctionComponent<HighlightedTextProps> = ({
    text = "",
    highlight = "",
    textStyles,
    style,
    variant = "body",
    ...props
}) => {
    const [styles, { highlightedText }] = useThemedStylesWithOverride(
        createStyles,
        { highlightedText: style },
        {},
    );

    const highlightedString = EscapeForRegexProcessing(highlight.toLowerCase());
    const parts = text.split(new RegExp(`(${highlightedString})`, "gi"));

    return (
        <Text style={[styles.textWrapper, textStyles]}>
            {parts.map((part, idx) => (
                <Text
                    {...props}
                    variant={variant}
                    // biome-ignore lint/suspicious/noArrayIndexKey: don't currently have a better unique key
                    key={`${part}${idx}`}
                    style={
                        part.toLowerCase() === highlightedString && {
                            fontWeight:
                                highlightedText.highlightedWeight[variant],
                        }
                    }
                >
                    {part}
                </Text>
            ))}
        </Text>
    );
};

const createStyles = () =>
    StyleSheet.create({
        textWrapper: {
            display: "flex",
            flexDirection: "row",
        },
    });
