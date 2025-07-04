import type React from "react";
import {
    type ColorValue,
    type OpaqueColorValue,
    Pressable,
    type StyleProp,
    StyleSheet,
    type TextStyle,
    type ViewStyle,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import type { Theme } from "../../theme";
import type { ActionProps } from "./Action";
import type { ActionSize, ActionVariant } from "./types";

export const getBackgroundColor = (
    { color }: Theme,
    pressed: boolean,
    disabled: boolean | undefined,
): ColorValue => {
    if (disabled) {
        return color.inputBackgroundDisabled;
    }

    if (pressed) {
        return color.backgroundHighlight;
    }

    return color.inputBackground;
};

export const getLabelColor = (
    { color }: Theme,
    type: ActionVariant,
    pressed: boolean,
): ColorValue => {
    switch (type) {
        case "primary":
            return pressed ? color.primaryDark : color.primary;
        case "secondary":
            return pressed ? color.secondaryHighlight : color.secondary;
        case "flat":
            return pressed ? color.textHighlight : color.textPrimary;
    }

    return color.textInverted;
};

export type IconButtonStyles = {
    size: { [key in ActionSize]: number };
    fontSize: { [key in ActionSize]: number };
};

export interface IconButtonProps
    extends Omit<ActionProps, "label" | "size" | "style"> {
    iconName: keyof typeof Octicons.glyphMap;
    iconStyle?: StyleProp<TextStyle>;
    rounded?: boolean;
    style?: StyleProp<ViewStyle>;
    color?: string | OpaqueColorValue | undefined;

    onPress?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
    iconName,
    variant = "primary",
    rounded = true,
    disabled,
    style,
    iconStyle,
    color,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { rounded });
    const { theme } = useTheme();

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                {
                    backgroundColor: getBackgroundColor(
                        theme,
                        pressed,
                        disabled,
                    ),
                },
                style,
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <Octicons
                    name={iconName}
                    style={[styles.icon, iconStyle]}
                    size={20}
                    color={color ?? getLabelColor(theme, variant, pressed)}
                />
            )}
        </Pressable>
    );
};

IconButton.displayName = "IconButton";

const createStyles = (
    { theme: { color, border } }: ThemedStyles,
    { rounded }: Partial<IconButtonProps>,
) => {
    const size = 28;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: color.inputBackground,
            borderRadius: rounded === false ? border.radius.tight : size / 2,
            height: size,
            width: size,
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {},
    });
    return styles;
};
