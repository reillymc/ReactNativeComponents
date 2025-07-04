import type React from "react";
import {
    type ColorValue,
    Pressable,
    type StyleProp,
    StyleSheet,
    Text,
    type ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import type { Theme } from "../../theme";
import type { ButtonProps } from "./Button";
import type { ActionSize, ActionVariant } from "./types";

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
                return color.destructiveHighlight;
            }
            return pressed ? color.destructiveHighlight : color.destructive;
        }
        case "flat":
            return "transparent";
    }
};

export const getLabelColor = (
    { color }: Theme,
    type: ActionVariant,
    pressed: boolean,
): ColorValue => {
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

export type FeatureButtonStyles = {
    size: { [key in ActionSize]: number };
    fontSize: { [key in ActionSize]: number };
};

export interface FeatureButtonProps
    extends Pick<ButtonProps, "containerStyle" | "disabled" | "onPress"> {
    label?: string;
    iconName: keyof typeof AntDesign.glyphMap;
    rounded?: boolean;
    size?: ActionSize;
    variant?: ActionVariant;
    style?: StyleProp<ViewStyle>;
}

export const FeatureButton: React.FC<FeatureButtonProps> = ({
    iconName,
    label,
    variant = "primary",
    size = "regular",
    rounded = true,
    disabled,
    style,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { size, rounded });
    const { theme } = useTheme();

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                {
                    backgroundColor: getBackgroundColor(
                        theme,
                        variant,
                        pressed,
                        disabled,
                    ),
                },
                style,
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <>
                    <AntDesign
                        name={iconName}
                        type="font-awesome"
                        size={styles.container.height * 0.4}
                        color={getLabelColor(theme, variant, pressed)}
                        style={styles.icon}
                    />
                    {size !== "small" && label && (
                        <Text
                            numberOfLines={1}
                            style={[
                                styles.label,
                                {
                                    color: getLabelColor(
                                        theme,
                                        variant,
                                        pressed,
                                    ),
                                },
                            ]}
                        >
                            {label}
                        </Text>
                    )}
                </>
            )}
        </Pressable>
    );
};

FeatureButton.displayName = "FeatureButton";

const createStyles = (
    { styles: { button, iconButton } }: ThemedStyles,
    { size = "regular", rounded = true }: Partial<FeatureButtonProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: iconButton.size[size],
            width: iconButton.size[size],
            borderRadius: rounded
                ? iconButton.size[size] / 2
                : button.borderRadius,
        },
        icon: {},
        label: {
            fontFamily: button.label.fontFamilyWeight,
            fontSize: iconButton.fontSize[size],
            paddingTop: size === "large" ? 6 : 3,
        },
    });
    return styles;
};
