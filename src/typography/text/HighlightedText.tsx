import type { FunctionComponent } from "react";
import { type ColorValue, StyleSheet, type TextStyle } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../internal";
import { Text, type TextProps, type TextVariant } from "./Text";

type HighlightPart = {
    text: string;
    highlighted: boolean;
    offset: number;
};

const escapeForRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const splitHighlight = (
    text: string,
    highlight: string,
): Array<HighlightPart> => {
    if (!highlight) return [{ text, highlighted: false, offset: 0 }];

    const lowerHighlight = highlight.toLowerCase();
    const pattern = new RegExp(`(${escapeForRegex(highlight)})`, "gi");

    const parts: Array<HighlightPart> = [];
    let offset = 0;

    for (const part of text.split(pattern)) {
        if (part === "") continue;

        parts.push({
            text: part,
            highlighted: part.toLowerCase() === lowerHighlight,
            offset,
        });

        offset += part.length;
    }

    return parts;
};

export interface HighlightedTextTheme {
    color: ColorValue;
    highlightedWeight: Record<TextVariant, TextStyle["fontWeight"]>;
}
export interface HighlightedTextProps extends Pick<TextProps, "variant"> {
    text?: string;
    textStyles?: TextProps["style"];
    theme?: DeepPartial<HighlightedTextTheme>;
    highlight?: string;
}

export const HighlightedText: FunctionComponent<HighlightedTextProps> = ({
    text = "",
    highlight = "",
    textStyles,
    theme: themeOverrides,
    variant = "body",
    ...props
}) => {
    const { theme } = useComponent("highlightedText", { themeOverrides });

    const parts = splitHighlight(text, highlight);

    return (
        <Text style={[styles.textWrapper, textStyles]}>
            {parts.map((part) => (
                <Text
                    {...props}
                    variant={variant}
                    key={part.offset}
                    style={[
                        { color: theme.color },
                        part.highlighted && {
                            fontWeight: theme.highlightedWeight[variant],
                        },
                    ]}
                >
                    {part.text}
                </Text>
            ))}
        </Text>
    );
};

const styles = StyleSheet.create({
    textWrapper: {
        display: "flex",
        flexDirection: "row",
    },
});
