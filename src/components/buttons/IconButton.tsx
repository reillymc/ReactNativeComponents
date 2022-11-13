import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { ButtonProps, getBackgroundColor, getLabelColor } from "./Button";
import { ActionSize } from ".";

export type IconButtonStyles = {
    size: { [key in ActionSize]: number };
    fontSize: { [key in ActionSize]: number };
};

export interface IconButtonProps extends ButtonProps {
    iconName: keyof typeof AntDesign.glyphMap;
    rounded?: boolean;

    onPress: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
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
                { backgroundColor: getBackgroundColor(theme, variant, pressed) },
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
                            style={[styles.label, { color: getLabelColor(theme, variant, pressed) }]}
                        >
                            {label}
                        </Text>
                    )}
                </>
            )}
        </Pressable>
    );
};

IconButton.displayName = "IconButton";

const createStyles = (
    { styles: { button, iconButton } }: ThemedStyles,
    { size = "regular", rounded = true }: Partial<IconButtonProps>,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: iconButton.size[size],
            width: iconButton.size[size],
            borderRadius: rounded ? iconButton.size[size] / 2 : button.borderRadius,
        },
        icon: {},
        label: {
            fontFamily: button.fontFamilyWeight,
            fontSize: iconButton.fontSize[size],
            paddingTop: size === "large" ? 6 : 3,
        },
    });
