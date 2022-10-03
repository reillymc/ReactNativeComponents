import React from "react";
import { ColorValue, Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type ButtonType = "shaded" | "flat";
type ButtonSize = "small" | "medium" | "large";

const getBackgroundColor = (type: ButtonType, pressed: boolean): ColorValue => {
    if (type === "shaded") {
        return pressed ? "#666" : "#333";
    }

    return "transparent";
};

const getLabelColor = (type: ButtonType, pressed: boolean): ColorValue => {
    if (type === "shaded") {
        return "#fff";
    }

    return pressed ? "#bbb" : "#333";
};

const getHeight = (type: ButtonType, size: ButtonSize): number => {
    if (type === "flat") return 0;

    switch (size) {
        case "small":
            return 30;
        case "medium":
            return 40;
        case "large":
            return 50;
    }
};

const getWidth = (type: ButtonType, size: ButtonSize): number => {
    if (type === "flat") return 0;

    switch (size) {
        case "small":
            return 80;
        case "medium":
            return 120;
        case "large":
            return 180;
    }
};

const getFontSize = (size: ButtonSize): number => {
    switch (size) {
        case "small":
            return 14;
        case "medium":
            return 16;
        case "large":
            return 20;
    }
};

interface ButtonProps {
    label: string;
    type?: ButtonType;
    size?: ButtonSize;
    contentAlign?: "center" | "left" | "right";
    disabled?: boolean;
    style?: ViewStyle;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    type = "shaded",
    size = "large",
    contentAlign = "center",
    disabled,
    style,
    onPress,
}) => {
    const hitBuffer = size === "small" ? 80 : 20;

    return (
        <Pressable
            hitSlop={hitBuffer}
            disabled={disabled}
            style={({ pressed }) => [
                style,
                styles.button,
                {
                    minHeight: getHeight(type, size),
                    minWidth: getWidth(type, size),
                    borderRadius: 8,
                    backgroundColor: getBackgroundColor(type, pressed),
                    color: getLabelColor(type, pressed),
                },
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <Text
                    style={[
                        styles.label,
                        {
                            color: getLabelColor(type, pressed),
                            fontSize: getFontSize(size),
                            textAlign: contentAlign,
                            paddingHorizontal: type === "shaded" ? 8 : 0,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};

export { Button, ButtonProps, ButtonSize };

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
    },
    label: {
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Comfortaa-Regular",
    },
});
