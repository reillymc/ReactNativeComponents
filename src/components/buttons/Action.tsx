import React from "react";
import { ColorValue, Pressable, StyleSheet, ViewStyle } from "react-native";
import { ActionSize, ActionVariant } from ".";
import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { Theme } from "../../theme";
import { Text } from "../Text";

const getLabelColor = ({ color }: Theme, variant: ActionVariant, pressed: boolean): ColorValue => {
    switch (variant) {
        case "primary":
            return pressed ? color.primaryHighlight : color.primary;
        case "secondary":
            return pressed ? color.secondaryHighlight : color.secondary;
        case "flat":
            return pressed ? color.textHighlight : color.textPrimary;
    }
};

export type ActionStyles = {
    color: { [key in ActionVariant]: string };

    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
};

export interface ActionProps {
    label: string;
    variant?: ActionVariant;
    style?: ViewStyle;
    size?: ActionSize;
    disabled?: boolean;
    onPress: () => void;
}

export const Action: React.FC<ActionProps> = ({
    label,
    variant = "flat",
    size = "regular",
    disabled,
    style,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { variant, size });
    const { theme } = useTheme();

    return (
        <Pressable hitSlop={30} disabled={disabled} style={[styles.container, style]} onPress={onPress}>
            {({ pressed }) => (
                <Text style={[styles.label, { color: getLabelColor(theme, variant, pressed) }]}>{label}</Text>
            )}
        </Pressable>
    );
};

Action.displayName = "Action";

const createStyles = (
    { styles: { action, common } }: ThemedStyles,
    { size = "regular", variant = "flat" }: Partial<ActionProps>,
) =>
    StyleSheet.create({
        container: {},
        label: {
            color: action.color[variant],
            fontFamily: action.fontFamilyWeight,
            fontSize: common.action.fontSize[size],
        },
    });
