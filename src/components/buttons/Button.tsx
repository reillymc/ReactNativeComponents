import React from "react";
import { ColorValue, DimensionValue, Pressable, StyleSheet, Text } from "react-native";

import { Theme } from "../../theme";
import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";

import { ActionProps } from "./Action";
import { ActionSize, ActionVariant } from "./types";

export const getBackgroundColor = (
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
        case "flat":
            return "transparent";
    }
};

export const getLabelColor = ({ color }: Theme, type: ActionVariant, pressed: boolean): ColorValue => {
    switch (type) {
        case "primary":
            return color.textOnPrimary;
        case "secondary":
            return color.textOnSecondary;
        case "flat":
            return pressed ? color.textHighlight : color.textPrimary;
    }

    return color.textInverted;
};

type ButtonStyles = {
    height: { [key in ActionSize]: DimensionValue };
    width: { [key in ActionSize]: DimensionValue };
    borderRadius: number;

    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
};

interface ButtonProps extends ActionProps {
    contentAlign?: "center" | "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = "primary",
    size = "large",
    contentAlign = "center",
    disabled,
    style,
    onPress,
}) => {
    const hitBuffer = size === "small" ? 50 : 20;

    const styles = useThemedStyles(createStyles, { size, contentAlign, variant });
    const { theme } = useTheme();

    return (
        <Pressable
            hitSlop={hitBuffer}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: getBackgroundColor(theme, variant, pressed, disabled),
                    color: getLabelColor(theme, variant, pressed),
                },
                style,
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <Text numberOfLines={1} style={[styles.label, { color: getLabelColor(theme, variant, pressed) }]}>
                    {label}
                </Text>
            )}
        </Pressable>
    );
};

Button.displayName = "Button";

export { Button, ButtonProps, ButtonStyles };

const createStyles = (
    { styles: { button, common, baseInput } }: ThemedStyles,
    { size = "large", contentAlign, variant }: Partial<ButtonProps>,
) => {
    const styles = StyleSheet.create({
        button: {
            justifyContent: "center",
            borderRadius: button.borderRadius,
            minHeight: button.height[size],
            minWidth: button.width[size],
            width: button.width[size],
            height: button.height[size],
        },
        label: {
            fontFamily: button.fontFamilyWeight,
            fontSize: common.action.fontSize[size],
            textAlign: contentAlign,
            paddingHorizontal: variant !== "flat" ? baseInput.padding : 0,
        },
    });
    return styles;
};
