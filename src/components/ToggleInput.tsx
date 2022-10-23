import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemeContext, useThemedStyles } from "./ThemeProvider";
import { ActionVariant } from "./Action";

type ToggleInputStyles = {};

interface ToggleInputProps {
    toggled?: boolean;
    iconName?: keyof typeof AntDesign.glyphMap;
    variant?: ActionVariant;

    style?: ViewStyle;

    onPress: () => void;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
    toggled = false,
    iconName = "check",
    variant = "primary",
    style,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { variant });

    return (
        <Pressable style={[styles.container, style]} onPress={onPress} hitSlop={30}>
            {toggled ? <AntDesign name={iconName} type="font-awesome" size={20} style={styles.icon} /> : <></>}
        </Pressable>
    );
};

ToggleInput.displayName = "ToggleInput";

export { ToggleInput, ToggleInputProps, ToggleInputStyles };

const createStyles = ({ theme: { color } }: ThemeContext, { variant = "primary" }: Partial<ToggleInputProps>) => {
    const mainColor = variant === "flat" ? color["text"] : color[variant];

    return StyleSheet.create({
        container: {
            width: 32,
            height: 32,
            borderRadius: 16,
            borderColor: mainColor,
            borderWidth: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            color: mainColor,
            height: 20,
            width: 20,
        },
    });
};
