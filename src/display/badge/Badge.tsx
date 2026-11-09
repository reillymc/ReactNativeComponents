import type { FC } from "react";
import {
    type ColorValue,
    type StyleProp,
    type TextStyle,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, type PropFilter, useComponent } from "../../internal";
import { TextBase } from "../../typography/text";

type BadgeVariant = "primary" | "secondary";

export type BadgeTheme = {
    size: number;
    borderRadius: number;
    color: Record<BadgeVariant, ColorValue>;
    fontWeight: TextStyle["fontWeight"];
    backgroundColor: Record<BadgeVariant, ColorValue>;
};

export interface BadgeProps {
    label?: string;
    variant?: BadgeVariant;
    theme?: DeepPartial<BadgeTheme>;
    style?: StyleProp<ViewStyle>;
}

export const Badge: FC<BadgeProps> = ({
    label = "",
    variant = "primary",
    theme: themeOverrides,
    style,
}) => {
    const { styles, theme } = useComponent("badge", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    return (
        <View style={[styles.container, style]}>
            <TextBase
                numberOfLines={1}
                theme={{
                    color: theme.color[variant],
                    font: { weight: theme.fontWeight },
                }}
            >
                {label}
            </TextBase>
        </View>
    );
};

Badge.displayName = "Badge";

const createStyles = defineStyles(
    (theme: BadgeTheme, props: PropFilter<BadgeProps, "variant">) => ({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: theme.size,
            width: theme.size,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.backgroundColor[props.variant],
        },
    }),
);
