import type React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../hooks";
import type { ActionVariant } from "./buttons/Action";
import { Text } from "./Text";

export type AlertIndicatorStyles = {};

export interface AlertIndicatorProps {
    label?: string;
    variant?: ActionVariant;
    style?: StyleProp<ViewStyle>;
}

export const AlertIndicator: React.FC<AlertIndicatorProps> = ({
    label = "",
    variant = "primary",
    style,
}) => {
    const styles = useThemedStyles(createStyles, { variant });

    return (
        <View style={[styles.container, style]}>
            <Text numberOfLines={1} style={styles.text} variant="caption">
                {label}
            </Text>
        </View>
    );
};

AlertIndicator.displayName = "AlertIndicator";

const createStyles = (
    { theme: { color } }: ThemedStyles,
    { variant = "primary" }: Partial<AlertIndicatorProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 28,
            width: 28,
            borderRadius: 14,
            backgroundColor: color[variant],
        },
        text: {
            color: color.textInverted,
        },
    });
    return styles;
};
