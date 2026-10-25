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

export type AlertVariant = "primary" | "secondary";

export type AlertIndicatorTheme = {
    size: number;
    borderRadius: number;
    color: Record<AlertVariant, ColorValue>;
    backgroundColor: Record<AlertVariant, ColorValue>;
};

export interface AlertIndicatorProps {
    label?: string;
    variant?: AlertVariant;
    theme?: DeepPartial<AlertIndicatorTheme>;
    style?: StyleProp<ViewStyle>;
}

export const AlertIndicator: FC<AlertIndicatorProps> = ({
    label = "",
    variant = "primary",
    theme: themeOverrides,
    style,
}) => {
    const { styles } = useComponent("alertIndicator", {
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

AlertIndicator.displayName = "AlertIndicator";

const createStyles = defineStyles(
    (
        theme: AlertIndicatorTheme,
        props: PropFilter<AlertIndicatorProps, "variant">,
    ) => ({
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
