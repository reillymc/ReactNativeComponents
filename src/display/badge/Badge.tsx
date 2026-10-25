import type { FC } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, type PropFilter, useComponent } from "../../internal";
import { Text } from "../../typography/text";

export type BadgeVariant = "primary" | "secondary";

export type BadgeTheme = {
    size: number;
    borderRadius: number;
    color: Record<BadgeVariant, ColorValue>;
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
    const { styles } = useComponent("badge", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    return (
        <View style={[styles.container, style]}>
            <Text numberOfLines={1} style={styles.text}>
                {label}
            </Text>
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
        text: {
            color: theme.color[props.variant],
            fontWeight: "600",
        },
    }),
);
