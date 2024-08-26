import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { ThemedStyles, useThemedStyles } from "../hooks";

import { ActionVariant } from "./buttons";
import { Text } from "./Text";

export interface AlertIndicatorStyles {}

export interface AlertIndicatorProps {
    label?: string;
    variant?: Exclude<ActionVariant, "flat">;
    style?: StyleProp<ViewStyle>;
}

export const AlertIndicator: React.FC<AlertIndicatorProps> = ({ label = "", variant = "primary", style }) => {
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

const createStyles = ({ theme: { color } }: ThemedStyles, { variant = "primary" }: Partial<AlertIndicatorProps>) => {
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
