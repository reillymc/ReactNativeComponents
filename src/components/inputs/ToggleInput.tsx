import React from "react";
import { DimensionValue, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { ActionSize, ActionVariant } from "../buttons";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { BaseInputProps } from "./BaseInput";

export type ToggleInputStyles = {
    size: { [key in ActionSize]: DimensionValue };
    iconSize: { [key in ActionSize]: number };
    borderRadius: number;
    borderWidth: number;
};

export interface ToggleInputProps extends Pick<BaseInputProps, "label" | "disabled" | "helpText"> {
    value?: boolean;
    iconName?: keyof typeof AntDesign.glyphMap;
    variant?: ActionVariant;
    size?: ActionSize;
    style?: StyleProp<ViewStyle>;
    onChange: (value: boolean) => void | null | React.SetStateAction<boolean>;
}

export const ToggleInput: React.FC<ToggleInputProps> = ({
    label,
    helpText,
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
        <View style={style}>
            <Pressable hitSlop={16} style={styles.container} onPress={() => onChange(!value)}>
                <View style={styles.iconContainer}>
                    {!!value && <Icon iconName={iconName} size={toggleInput.iconSize[size]} style={styles.icon} />}
                </View>
                {label && (
                    <View style={styles.label}>
                        {typeof label === "string" ? <Text variant="label">{label}</Text> : label}
                    </View>
                )}
            </Pressable>
            {helpText && (
                <View style={styles.helpText}>
                    {typeof helpText === "string" ? <Text variant="caption">{helpText}</Text> : helpText}
                </View>
            )}
        </View>
    );
};

ToggleInput.displayName = "ToggleInput";

const createStyles = (
    { theme: { color }, styles: { toggleInput, baseInput } }: ThemedStyles,
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
            flexDirection: "row",
            alignItems: "center",
        },
        iconContainer: {
            width: toggleInput.size[size],
            height: toggleInput.size[size],
            borderRadius: toggleInput.borderRadius,
            borderWidth: size === "small" ? 1 : toggleInput.borderWidth,
            borderColor: mainColor,
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            color: mainColor,
        },
        label: {
            marginLeft: 8,
        },
        helpText: {
            marginTop: baseInput.labelMargin,
        },
    });
    return styles;
};
