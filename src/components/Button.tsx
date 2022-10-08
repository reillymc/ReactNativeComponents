import React from "react";
import { ColorValue, Pressable, StyleSheet, Text, ViewStyle, TextStyle } from "react-native";
import { Theme, ThemeContext, useTheme, useThemedStyles } from "./ThemeProvider";

type ButtonVariant = "primary" | "secondary" | "flat";
type ButtonSize = "small" | "medium" | "large";

const getBackgroundColor = ({ color }: Theme, type: ButtonVariant, pressed: boolean): ColorValue => {
    switch (type) {
        case "primary":
            return pressed ? color.primaryHighlight : color.primary;
        case "secondary":
            return pressed ? color.secondaryHighlight : color.secondary;
        case "flat":
            return "transparent";
    }
};

const getLabelColor = ({ color }: Theme, type: ButtonVariant, pressed: boolean): ColorValue => {
    if (type !== "flat") {
        return color.textInverted;
    }

    return pressed ? color.textHighlight : color.text;
};

const getFontSize = ({ font }: Theme, size: ButtonSize): number => {
    switch (size) {
        case "small":
            return font.size.small;
        case "medium":
            return font.size.regular;
        case "large":
            return font.size.large;
    }
};

type ButtonStyles = {
    height: { [key in ButtonSize]: number };
    width: { [key in ButtonSize]: number };
    color: { [key in ButtonVariant]: string };
    borderRadius: number;

    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
};

interface ButtonProps {
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    contentAlign?: "center" | "left" | "right";
    disabled?: boolean;
    style?: ViewStyle;
    onPress: () => void;
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

    const styles = useThemedStyles(createStyles);
    const {
        styles: { button },
        theme,
    } = useTheme();

    return (
        <Pressable
            hitSlop={hitBuffer}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                {
                    minHeight: button.height[size],
                    minWidth: button.width[size],
                    backgroundColor: getBackgroundColor(theme, variant, pressed),
                    color: getLabelColor(theme, variant, pressed),
                },
                style,
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <Text
                    style={[
                        styles.label,
                        {
                            color: getLabelColor(theme, variant, pressed),
                            fontSize: getFontSize(theme, size),
                            textAlign: contentAlign,
                            paddingHorizontal: variant !== "flat" ? 8 : 0,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};

export { Button, ButtonProps, ButtonStyles, ButtonSize };

const createStyles = ({ theme, styles: { button } }: ThemeContext) =>
    StyleSheet.create({
        button: {
            justifyContent: "center",
            borderRadius: button.borderRadius,
        },
        label: {
            fontFamily: button.fontFamilyWeight,
        },
    });
