import type { FC, ReactNode } from "react";
import {
    Text as RnText,
    type TextProps as RnTextProps,
    StyleSheet,
    type TextStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";

export type TextVariant =
    | "display"
    | "title"
    | "heading"
    | "label"
    | "body"
    | "caption";

interface BaseStyles {
    color: TextStyle["color"];
    font: {
        family: TextStyle["fontFamily"];
        weight: TextStyle["fontWeight"];
        size: TextStyle["fontSize"];
    };
}

export interface TextStyles {
    color: BaseStyles["color"];
    font: Record<TextVariant, BaseStyles["font"]>;
}

export interface TextProps extends Omit<RnTextProps, "style"> {
    variant?: TextVariant;
    style?: DeepPartial<BaseStyles>;
    children?: ReactNode;
}

export const Text: FC<TextProps> = ({
    variant = "body",
    style,
    children,
    ...props
}) => {
    const [styles] = useThemedStylesWithOverride(
        createStyles,
        {
            text: {
                color: style?.color,
                font: {
                    [variant]: {
                        family: style?.font?.family,
                        weight: style?.font?.weight,
                        size: style?.font?.size,
                    },
                },
            },
        },
        { variant },
    );

    return (
        <RnText {...props} style={styles.text}>
            {children}
        </RnText>
    );
};

const createStyles = (
    { styles: { text } }: ThemedStyles,
    { variant = "body" }: Partial<TextProps>,
) =>
    StyleSheet.create({
        text: {
            fontFamily: text.font[variant].family,
            fontWeight: text.font[variant].weight,
            fontSize: text.font[variant].size,
            color: text.color,
        },
    });
