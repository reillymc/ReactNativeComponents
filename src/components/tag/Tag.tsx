import type { FC, ReactElement } from "react";
import {
    Pressable,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { Text } from "../text";

export interface TagProps {
    label?: string;
    /**
     * [TagIcon](./TagIcon.tsx)
     */
    icon?: ReactElement;
    variant?: "light" | "dark";
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const Tag: FC<TagProps> = ({ label, onPress, icon, variant, style }) => {
    const styles = useThemedStyles(createStyles, { variant, label });

    return (
        <Pressable
            disabled={!onPress}
            onPress={onPress}
            style={[styles.container, style]}
        >
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
};

const createStyles = (
    { theme: { color } }: ThemedStyles,
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
            marginRight: label === undefined ? 0 : 6,
            marginVertical: 6,
        },
        text: {
            color: color.textPrimary,
        },
    });
    return styles;
};
