import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { ActionSize, ActionVariant } from "../buttons";
import { Icon } from "../Icon";

export type ToggleInputStyles = {
    size: { [key in ActionSize]: number | string };
    iconSize: { [key in ActionSize]: number };
    borderRadius: number;
    borderWidth: number;
};

export interface ToggleInputProps {
    value?: boolean;
    iconName?: keyof typeof AntDesign.glyphMap;
    disabled?: boolean;
    variant?: ActionVariant;
    size?: ActionSize;
    style?: StyleProp<ViewStyle>;
    onChange: (value: boolean) => void | null | React.SetStateAction<boolean>;
}

export const ToggleInput: React.FC<ToggleInputProps> = ({
    value = false,
    iconName = "check",
    variant = "primary",
    size = "regular",
    style,
    onChange,
}) => {
    const styles = useThemedStyles(createStyles, { variant, size });
    const {
        styles: { toggleInput },
    } = useTheme();

    return (
        <Pressable style={[styles.container, style]} onPress={() => onChange(!value)} hitSlop={20}>
            {!!value && <Icon iconName={iconName} size={toggleInput.iconSize[size]} style={styles.icon} />}
        </Pressable>
    );
};

ToggleInput.displayName = "ToggleInput";

const createStyles = (
    { theme: { color }, styles: { toggleInput } }: ThemedStyles,
    { variant = "primary", size = "regular" }: Partial<ToggleInputProps>,
) => {
    const mainColor = {
        flat: color.textPrimary,
        primary: color.primary,
        secondary: color.secondary,
        destructive: color.destructive,
    }[variant];

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: toggleInput.size[size],
            height: toggleInput.size[size],
            borderRadius: toggleInput.borderRadius,
            borderWidth: size === "small" ? 1 : toggleInput.borderWidth,
            borderColor: mainColor,
        },
        icon: {
            color: mainColor,
        },
    });
    return styles;
};
