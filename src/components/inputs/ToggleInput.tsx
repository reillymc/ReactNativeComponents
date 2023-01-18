import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useThemedStyles } from "../../hooks";
import { ActionVariant } from "../buttons";

export type ToggleInputStyles = {
    size: number;
    iconSize: number;
    borderRadius: number;
    borderWidth: number;
};

export interface ToggleInputProps {
    value?: boolean;
    iconName?: keyof typeof AntDesign.glyphMap;
    disabled?: boolean;
    variant?: ActionVariant;
    style?: StyleProp<ViewStyle>;
    onChange: (value: boolean) => void | null | React.SetStateAction<boolean>;
}

export const ToggleInput: React.FC<ToggleInputProps> = ({
    value = false,
    iconName = "check",
    variant = "primary",
    style,
    onChange,
}) => {
    const styles = useThemedStyles(createStyles, { variant });

    return (
        <Pressable style={[styles.container, style]} onPress={() => onChange(!value)} hitSlop={20}>
            {!!value && <AntDesign name={iconName} type="font-awesome" size={styles.icon.height} style={styles.icon} />}
        </Pressable>
    );
};

ToggleInput.displayName = "ToggleInput";

const createStyles = (
    { theme: { color }, styles: { toggleInput } }: ThemedStyles,
    { variant = "primary" }: Partial<ToggleInputProps>,
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
            width: toggleInput.size,
            height: toggleInput.size,
            borderRadius: toggleInput.borderRadius,
            borderWidth: toggleInput.borderWidth,
            borderColor: mainColor,
        },
        icon: {
            color: mainColor,
            height: toggleInput.iconSize,
            width: toggleInput.iconSize,
        },
    });
    return styles;
};
