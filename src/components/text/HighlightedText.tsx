import type React from "react";
import { StyleSheet, type TextStyle } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useThemedStyles } from "../../hooks";
import { Text, type TextProps, type TextVariant } from "./Text";

type HighlightPart = {
    text: string;
    highlighted: boolean;
};

const escapeForRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const splitHighlight = (
    text: string,
    highlight: string,
): Array<HighlightPart> => {
    if (!highlight) return [{ text, highlighted: false }];

    const lowerHighlight = highlight.toLowerCase();
    const pattern = new RegExp(`(${escapeForRegex(highlight)})`, "gi");

    return text
        .split(pattern)
        .filter((part) => part !== "")
        .map((part) => ({
            text: part,
            highlighted: part.toLowerCase() === lowerHighlight,
        }));
};

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
    style: styleOverrides,
    variant = "body",
    ...props
}) => {
    const [styles, { style }] = useThemedStyles(
        "highlightedText",
        createStyles,
        {
            styles: { highlightedText: styleOverrides },
        },
    );

    const parts = splitHighlight(text, highlight);

    return (
        <Text style={[styles.textWrapper, textStyles]}>
            {parts.map((part, idx) => (
                <Text
                    {...props}
                    variant={variant}
                    // biome-ignore lint/suspicious/noArrayIndexKey: don't currently have a better unique key
                    key={`${part.text}${idx}`}
                    style={
                        part.highlighted && {
                            fontWeight: style.highlightedWeight[variant],
                        }
                    }
                >
                    {part.text}
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
