import React from "react";
import { ColorValue, Pressable, StyleSheet, Text } from "react-native";
import { ActionProps, ActionSize, ActionVariant, getActionFontSize } from "./Action";
import { Theme, ThemeContext, useTheme, useThemedStyles } from "./ThemeProvider";

export const getBackgroundColor = ({ color }: Theme, variant: ActionVariant, pressed: boolean): ColorValue => {
    switch (variant) {
        case "primary":
            return pressed ? color.primaryHighlight : color.primary;
        case "secondary":
            return pressed ? color.secondaryHighlight : color.secondary;
        case "flat":
            return "transparent";
    }
};

export const getLabelColor = ({ color }: Theme, type: ActionVariant, pressed: boolean): ColorValue => {
    if (type !== "flat") {
        return color.textInverted;
    }

    return pressed ? color.textHighlight : color.text;
};

type ButtonStyles = {
    height: { [key in ActionSize]: number };
    width: { [key in ActionSize]: number };
    color: { [key in ActionVariant]: string };
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
    const hitBuffer = size === "small" ? 80 : 20;

    const styles = useThemedStyles(createStyles, { size, contentAlign, variant });
    const { theme } = useTheme();

    return (
        <Pressable
            hitSlop={hitBuffer}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: getBackgroundColor(theme, variant, pressed),
                    color: getLabelColor(theme, variant, pressed),
                },
                style,
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <Text style={[styles.label, { color: getLabelColor(theme, variant, pressed) }]}>{label}</Text>
            )}
        </Pressable>
    );
};

Button.displayName = "Button";

export { Button, ButtonProps, ButtonStyles };

const createStyles = (
    { styles: { button }, theme }: ThemeContext,
    { size = "large", contentAlign, variant }: Partial<ButtonProps>,
) =>
    StyleSheet.create({
        button: {
            justifyContent: "center",
            borderRadius: button.borderRadius,
            minHeight: button.height[size],
            minWidth: button.width[size],
        },
        label: {
            fontFamily: button.fontFamilyWeight,
            fontSize: getActionFontSize(theme, size),
            textAlign: contentAlign,
            paddingHorizontal: variant !== "flat" ? 8 : 0,
        },
    });
