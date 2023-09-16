import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";

import { ThemedStyles, useTheme, useThemedStyles } from "../hooks";

export interface IconStyles {}

interface AntDesignProps {
    set?: never | "antdesign";
    iconName?: keyof typeof AntDesign.glyphMap;
}

interface OcticonsProps {
    set: "octicons";
    iconName?: keyof typeof Octicons.glyphMap;
}

export type IconProps = (AntDesignProps | OcticonsProps) & {
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
};

export const Icon: React.FC<IconProps> = ({ style, color, size = 20, iconName, set }) => {
    const styles = useThemedStyles(createStyles, { size });

    const { theme } = useTheme();

    if (set === "octicons") {
        return (
            <Octicons
                size={size}
                color={color ?? theme.color.textPrimary}
                name={iconName}
                style={[styles.icon, style]}
            />
        );
    } else {
        return (
            <AntDesign
                size={size}
                color={color ?? theme.color.textPrimary}
                name={iconName}
                style={[styles.icon, style]}
            />
        );
    }
};

Icon.displayName = "Icon";

const createStyles = ({}: ThemedStyles, { size }: Partial<IconProps>) => {
    const styles = StyleSheet.create({
        icon: {
            width: size,
            height: size,
        },
    });
    return styles;
};
