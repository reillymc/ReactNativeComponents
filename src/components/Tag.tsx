import React from "react";
import { StyleProp, StyleSheet, Pressable, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useThemedStyles } from "../hooks";

import { Text } from "./Text";

export interface TagProps {
    label: string | undefined;
    iconName?: keyof typeof AntDesign.glyphMap;
    variant?: "light" | "dark";
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const Tag: React.FC<TagProps> = ({ label, onPress, iconName, variant, style }) => {
    const styles = useThemedStyles(createStyles, { variant });

    return (
        <Pressable disabled={!onPress} onPress={onPress} style={[styles.container, style]}>
            {iconName && (
                <AntDesign name={iconName} type="font-awesome" size={styles.icon.height} style={styles.icon} />
            )}
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
};

const createStyles = ({ theme: { color } }: ThemedStyles, { variant = "dark" }: Partial<TagProps>) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 24,
            marginRight: 8,
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: variant === "dark" ? color.background : color.foreground,
            width: "auto",
        },
        icon: {
            height: 12,
            width: 12,
            marginRight: 6,
            color: color.textPrimary,
        },
        text: {
            color: color.textPrimary,
        },
    });
    return styles;
};
