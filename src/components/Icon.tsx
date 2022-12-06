import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useTheme, useThemedStyles } from "../hooks";

export interface IconStyles {}

export interface IconProps {
    iconName?: keyof typeof AntDesign.glyphMap;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
}

export const Icon: React.FC<IconProps> = ({ style, color, size = 20, iconName }) => {
    const styles = useThemedStyles(createStyles, { size });

    const { theme } = useTheme();

    return (
        <AntDesign size={size} color={color ?? theme.color.textPrimary} name={iconName} style={[styles.icon, style]} />
    );
};

Icon.displayName = "Icon";

const createStyles = ({}: ThemedStyles, { size }: Partial<IconProps>) =>
    StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        icon: {
            width: size,
            height: size,
        },
    });
