import React from "react";
import { ColorValue, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
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
        case "destructive":
            return pressed ? color.destructiveHighlight : color.destructive;
        case "flat":
            return pressed ? color.textHighlight : color.textPrimary;
    }
};

export type ActionStyles = {
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
};

export interface ActionProps {
    label?: string;
    variant?: ActionVariant;
    style?: StyleProp<ViewStyle>;
    size?: ActionSize;
    disabled?: boolean;
    onPress: () => void;
}

export const Action: React.FC<ActionProps> = ({
    label = "",
    variant = "flat",
    size = "regular",
    disabled,
    style,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { variant, size });
    const { theme } = useTheme();

    return (
        <Pressable hitSlop={20} disabled={disabled} style={[styles.container, style]} onPress={onPress}>
            {({ pressed }) => (
                <Text numberOfLines={1} style={[styles.label, { color: getLabelColor(theme, variant, pressed) }]}>
                    {label}
                </Text>
            )}
        </Pressable>
    );
};

Action.displayName = "Action";

const createStyles = ({ styles: { action, common } }: ThemedStyles, { size = "regular" }: Partial<ActionProps>) =>
    StyleSheet.create({
        container: {},
        label: {
            fontFamily: action.fontFamilyWeight,
            fontSize: common.action.fontSize[size],
        },
    });
