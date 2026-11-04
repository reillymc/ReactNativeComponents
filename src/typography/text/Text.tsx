import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    Text as RnText,
    type TextProps as RnTextProps,
    type TextStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, type PropFilter, useComponent } from "../../internal";
import { useSystems } from "../../theme/useSystems";

export type TextVariant =
    | "display"
    | "title"
    | "heading"
    | "label"
    | "body"
    | "caption";

export interface TextTheme {
    color: ColorValue;
    font: {
        [Variant in TextVariant]: {
            family: string;
            weight: TextStyle["fontWeight"];
            size: number;
        };
    };
}

export interface TextProps extends RnTextProps {
    variant?: TextVariant;
    theme?: DeepPartial<TextTheme>;
    children?: ReactNode;
}

export const Text: FC<TextProps> = ({
    variant = "body",
    style,
    theme: themeOverrides,
    children,
    ...props
}) => {
    const { maxFontSizeMultiplier } = useSystems();
    const { styles } = useComponent("text", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    return (
        <RnText
            maxFontSizeMultiplier={maxFontSizeMultiplier}
            {...props}
            style={[styles.text, style]}
        >
            {children}
        </RnText>
    );
};

const createStyles = defineStyles(
    (theme: TextTheme, props: PropFilter<TextProps, "variant">) => ({
        text: {
            fontFamily: theme.font[props.variant].family,
            fontWeight: theme.font[props.variant].weight,
            fontSize: theme.font[props.variant].size,
            color: theme.color,
        },
    }),
);
