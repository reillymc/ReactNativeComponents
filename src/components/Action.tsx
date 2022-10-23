import React from "react";
import { ColorValue, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Theme, ThemeContext, useTheme, useThemedStyles } from "./ThemeProvider";

export type ActionVariant = "primary" | "secondary" | "flat";
export type ActionSize = "small" | "medium" | "large";

const getLabelColor = ({ color }: Theme, variant: ActionVariant, pressed: boolean): ColorValue => {
    switch (variant) {
        case "primary":
            return pressed ? color.primaryHighlight : color.primary;
        case "secondary":
            return pressed ? color.secondaryHighlight : color.secondary;
        case "flat":
            return pressed ? color.textHighlight : color.text;
    }
};

export const getActionFontSize = ({ font }: Theme, size: ActionSize): number => {
    switch (size) {
        case "small":
            return font.size.small;
        case "medium":
            return font.size.regular;
        case "large":
            return font.size.large;
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
    size = "medium",
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

const createStyles = ({ styles: { action }, theme }: ThemeContext, { size = "medium" }: Partial<ActionProps>) =>
    StyleSheet.create({
        container: {
            // justifyContent: "center",
        },
        label: {
            fontFamily: action.fontFamilyWeight,
            fontSize: getActionFontSize(theme, size),
        },
    });
