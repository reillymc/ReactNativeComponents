import type React from "react";
import {
    Pressable,
    type StyleProp,
    StyleSheet,
    type ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../hooks";
import { Text } from "./text";

export interface TagProps {
    label?: string;
    iconName?: keyof typeof AntDesign.glyphMap;
    variant?: "light" | "dark";
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const Tag: React.FC<TagProps> = ({
    label,
    onPress,
    iconName,
    variant,
    style,
}) => {
    const styles = useThemedStyles(createStyles, { variant, label });

    return (
        <Pressable
            disabled={!onPress}
            onPress={onPress}
            style={[styles.container, style]}
        >
            {iconName && (
                <AntDesign
                    name={iconName}
                    type="font-awesome"
                    size={styles.icon.height}
                    style={styles.icon}
                />
            )}
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
};

const createStyles = (
    { theme: { color }, styles: { text } }: ThemedStyles,
    { variant = "dark", label }: Partial<TagProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 24,
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor:
                variant === "dark" ? color.background : color.foreground,
            width: "auto",
        },
        icon: {
            height: text.font.body.size,
            width: text.font.body.size,
            marginRight: label === undefined ? 0 : 6,
            marginVertical: 6,
            color: color.textPrimary,
        },
        text: {
            color: color.textPrimary,
        },
    });
    return styles;
};
