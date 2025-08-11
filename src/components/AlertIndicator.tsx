import type React from "react";
import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";

import { type ThemedStyles, useThemedStyles } from "../hooks";
import { Text } from "./text";

export type AlertVariant = "primary" | "secondary";

export type AlertIndicatorStyles = {
    size: number;
    borderRadius: number;
    color: Record<AlertVariant, ColorValue>;
    backgroundColor: Record<AlertVariant, ColorValue>;
};

export interface AlertIndicatorProps {
    label?: string;
    variant?: AlertVariant;
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
            <Text
                numberOfLines={1}
                style={styles.text}
                variant="bodyEmphasized"
            >
                {label}
            </Text>
        </View>
    );
};

AlertIndicator.displayName = "AlertIndicator";

const createStyles = (
    { styles: { alertIndicator } }: ThemedStyles,
    { variant = "primary" }: Partial<AlertIndicatorProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: alertIndicator.size,
            width: alertIndicator.size,
            borderRadius: alertIndicator.borderRadius,
            backgroundColor: alertIndicator.backgroundColor[variant],
        },
        text: {
            color: alertIndicator.color[variant],
        },
    });
    return styles;
};
