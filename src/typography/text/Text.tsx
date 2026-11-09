import type { FC, ReactNode } from "react";
import type { ColorValue, TextProps as RnTextProps } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../internal";
import { TextBase, type TextBaseTheme } from "./TextBase";

export type TextVariant =
    | "display"
    | "title"
    | "heading"
    | "label"
    | "body"
    | "caption";

export interface TextTheme {
    color: ColorValue;
    font: Record<TextVariant, TextBaseTheme["font"]>;
}

export interface TextProps extends RnTextProps {
    variant?: TextVariant;
    theme?: DeepPartial<TextTheme>;
    children?: ReactNode;
}

export const Text: FC<TextProps> = ({
    variant = "body",
    theme: themeOverrides,
    children,
    ...props
}) => {
    const { theme } = useComponent("text", { themeOverrides });

    return (
        <TextBase
            {...props}
            theme={{
                ...theme,
                font: theme.font[variant],
            }}
        >
            {children}
        </TextBase>
    );
};
