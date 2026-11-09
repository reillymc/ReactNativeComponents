import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    Text as RnText,
    type TextProps as RnTextProps,
    type TextStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../../internal";
import { useSystems } from "../../theme/useSystems";

export type TextBaseTheme = {
    color: ColorValue;
    font: {
        family: string;
        weight: TextStyle["fontWeight"];
        size: number;
    };
};

export interface TextBaseProps extends RnTextProps {
    theme?: DeepPartial<TextBaseTheme>;
    children?: ReactNode;
}

export const TextBase: FC<TextBaseProps> = ({
    style,
    theme: themeOverrides,
    children,
    ...props
}) => {
    const { maxFontSizeMultiplier } = useSystems();
    const { styles } = useComponent("textBase", {
        themeOverrides,
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

const createStyles = defineStyles((theme: TextBaseTheme) => ({
    text: {
        fontFamily: theme.font.family,
        fontWeight: theme.font.weight,
        fontSize: theme.font.size,
        color: theme.color,
    },
}));
