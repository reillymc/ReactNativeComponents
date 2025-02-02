import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ColorValue, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { Theme } from "../../theme";
import { Text } from "../Text";

import { ActionSize, ActionVariant } from "./types";

const getIconColor = (
    { color }: Theme,
    variant: ActionVariant,
    pressed: boolean,
    disabled: boolean | undefined,
): ColorValue => {
    switch (variant) {
        case "primary": {
            if (disabled) {
                return color.primaryLight;
            }
            return pressed ? color.primaryDark : color.primary;
        }
        case "secondary": {
            if (disabled) {
                return color.secondaryDisabled;
            }
            return pressed ? color.secondaryHighlight : color.secondary;
        }
        case "destructive": {
            if (disabled) {
                return color.destructiveDisabled;
            }
            return pressed ? color.destructiveHighlight : color.destructive;
        }
        case "flat": {
            if (disabled) {
                return color.textDisabled;
            }
            return pressed ? color.textHighlight : color.textPrimary;
        }
    }
};

export type IconActionStyles = {
    size: { [key in ActionSize]: number };
};

export interface IconActionProps {
    iconName: keyof typeof AntDesign.glyphMap;
    label?: string;
    variant?: ActionVariant;
    size?: ActionSize;
    labelPosition?: "left" | "right";
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<TextStyle>;
    onPress?: () => void;
}

export const IconAction: React.FC<IconActionProps> = ({
    iconName,
    label,
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
        <Pressable hitSlop={20} disabled={disabled} style={containerStyle} onPress={onPress}>
            {({ pressed }) => (
                <View style={styles.container}>
                    <AntDesign
                        name={iconName}
                        type="font-awesome"
                        size={styles.icon.height}
                        color={getIconColor(theme, variant, pressed, disabled)}
                        style={[styles.icon, iconStyle]}
                        android_ripple={{
                            color: theme.color.border,
                            borderless: true,
                            radius: styles.icon.height - theme.spacing.tiny,
                        }}
                    />
                    {label && (
                        <Text numberOfLines={1} style={styles.text}>
                            {label}
                        </Text>
                    )}
                </View>
            )}
        </Pressable>
    );
};

IconAction.displayName = "IconAction";

const createStyles = (
    { styles: { iconAction } }: ThemedStyles,
    { size = "regular", labelPosition = "right" }: Partial<IconActionProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: labelPosition === "left" ? "row-reverse" : "row",
            alignItems: "center",
        },
        icon: {
            height: iconAction.size[size],
            width: iconAction.size[size],
        },
        text: {
            marginLeft: labelPosition === "left" ? 0 : 6,
            marginRight: labelPosition === "left" ? 6 : 0,
        },
    });
    return styles;
};
