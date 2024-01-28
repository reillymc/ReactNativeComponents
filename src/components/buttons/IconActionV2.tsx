import { Octicons } from "@expo/vector-icons";
import React from "react";
import { ColorValue, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { Theme } from "../../theme";

import { ActionSize, ActionVariant } from "./types";

export const getLabelColor = ({ color }: Theme, type: ActionVariant, pressed: boolean): ColorValue => {
    switch (type) {
        case "primary":
            return pressed ? color.primaryHighlight : color.primary;
        case "secondary":
            return pressed ? color.secondaryHighlight : color.secondary;
        case "flat":
            return pressed ? color.textHighlight : color.textPrimary;
    }

    return color.textInverted;
};

export type IconActionStyles = {
    size: { [key in ActionSize]: number };
};

export interface IconActionV2Props {
    iconName: keyof typeof Octicons.glyphMap;
    variant?: ActionVariant;
    size?: ActionSize;
    labelPosition?: "left" | "right";
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<TextStyle>;
    onPress?: () => void;
}

export const IconActionV2: React.FC<IconActionV2Props> = ({
    iconName,
    variant = "secondary",
    size = "regular",
    labelPosition = "right",
    disabled,
    containerStyle,
    iconStyle,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { size, labelPosition });
    const { theme } = useTheme();

    return (
        <Pressable hitSlop={20} disabled={disabled} style={[styles.container, containerStyle]} onPress={onPress}>
            {({ pressed }) => (
                <Octicons
                    name={iconName}
                    style={[styles.icon, iconStyle]}
                    size={20}
                    color={getLabelColor(theme, variant, pressed)}
                />
            )}
        </Pressable>
    );
};

IconActionV2.displayName = "IconActionV2";

const createStyles = (
    { styles: { iconAction }, theme: { color } }: ThemedStyles,
    { size = "regular" }: Partial<IconActionV2Props>,
) => {
    const numericSize = iconAction.size[size] + 4;
    const styles = StyleSheet.create({
        container: {
            backgroundColor: color.background,
            borderRadius: numericSize / 2,
            height: numericSize,
            width: numericSize,
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            opacity: 0.8,
        },
    });
    return styles;
};
