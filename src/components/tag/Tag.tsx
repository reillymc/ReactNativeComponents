import type { FC, ReactElement } from "react";
import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { ActionBase } from "../action";
import { Text } from "../text";

export interface TagStyles {
    internalSpacing: number;
    borderRadius: number;
    padding: number;
}

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
    const [styles] = useThemedStyles("tag", createStyles, {
        props: { variant, label },
    });

    return (
        <ActionBase
            onPress={onPress}
            containerStyle={[styles.container, style]}
        >
            {icon}
            <Text style={styles.text}>{label}</Text>
        </ActionBase>
    );
};

const createStyles = (
    { theme: { color }, styles: { tag } }: ThemedStyles,
    { variant = "dark" }: Partial<TagProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: tag.borderRadius,
            padding: tag.padding,
            backgroundColor:
                variant === "dark" ? color.background : color.foreground,
            width: "auto",
            gap: tag.internalSpacing,
        },
        text: {
            color: color.textPrimary,
        },
    });
    return styles;
};
