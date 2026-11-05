import type { FunctionComponent } from "react";
import { StyleSheet, type TextStyle } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../internal";
import { Text, type TextProps, type TextTheme, type TextVariant } from "./Text";

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
    text: TextTheme;
    highlight: {
        weight: Record<TextVariant, TextStyle["fontWeight"]>;
    };
}
export interface HighlightedTextProps
    extends Pick<TextProps, "variant" | "numberOfLines" | "ellipsizeMode"> {
    text?: string;
    style?: TextProps["style"];
    theme?: DeepPartial<HighlightedTextTheme>;
    highlight?: string;
}

export const HighlightedText: FunctionComponent<HighlightedTextProps> = ({
    text = "",
    highlight = "",
    style,
    theme: themeOverrides,
    variant = "body",
    ...props
}) => {
    const { theme } = useComponent("highlightedText", { themeOverrides });

    const parts = splitHighlight(text, highlight);

    return (
        <Text
            {...props}
            variant={variant}
            theme={theme.text}
            style={[
                styles.textWrapper,
                props.numberOfLines === 1
                    ? styles.textWrapperTruncated
                    : styles.textWrapperRow,
                style,
            ]}
        >
            {parts.map((part) => (
                <Text
                    variant={variant}
                    key={part.offset}
                    theme={{
                        ...theme.text,
                        font: {
                            ...theme.text.font,
                            [variant]: {
                                ...theme.text.font[variant],
                                weight: part.highlighted
                                    ? theme.highlight.weight[variant]
                                    : undefined,
                            },
                        },
                    }}
                >
                    {part.text}
                </Text>
            ))}
        </Text>
    );
};

const styles = StyleSheet.create({
    textWrapper: {
        flexShrink: 1,
        minWidth: 0,
    },
    textWrapperRow: {
        display: "flex",
        flexDirection: "row",
    },
    textWrapperTruncated: {
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
    },
});
