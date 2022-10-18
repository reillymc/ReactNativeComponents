import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ButtonProps, ButtonSize, getBackgroundColor, getLabelColor } from "./Button";
import { useThemedStyles, ThemeContext, useTheme } from "./ThemeProvider";

const sizeToValue = (height: ButtonSize) => {
    switch (height) {
        case "small":
            return 50;
        case "medium":
            return 60;
        case "large":
            return 80;
    }
};

type IconButtonStyles = {
    size: { [key in ButtonSize]: number };
    rounded: boolean;
};

interface IconButtonProps extends ButtonProps {
    iconName: keyof typeof AntDesign.glyphMap;

    onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
    iconName,
    label,
    variant = "primary",
    size = "medium",
    disabled,
    onPress,
}) => {
    const dimensions = sizeToValue(size);

    const styles = useThemedStyles(createStyles);
    const {
        styles: { button, iconButton },
        theme,
    } = useTheme();

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                {
                    height: iconButton.size[size],
                    width: iconButton.size[size],
                    borderRadius: iconButton.rounded ? iconButton.size[size] / 2 : button.borderRadius,
                    backgroundColor: getBackgroundColor(theme, variant, pressed),
                },
            ]}
            onPress={onPress}
        >
            {({ pressed }) => (
                <>
                    <AntDesign 
                        name={iconName}
                        type="font-awesome"
                        size={dimensions * 0.4}
                        color={getLabelColor(theme, variant, pressed)}
                        tvParallaxProperties={null}
                        style={styles.icon}
                    />
                    {size !== "small" && label && (
                        <Text
                            style={[
                                styles.label,
                                {
                                    fontSize: size === "large" ? 13 : 11,
                                    color: getLabelColor(theme, variant, pressed),
                                    paddingTop: size === "large" ? 6 : 3,
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

IconButton.displayName = "IconButton";

export { IconButton, IconButtonStyles };

const createStyles = ({ styles: { button } }: ThemeContext) =>
    StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {},
        label: {
            fontFamily: button.fontFamilyWeight,
        },
    });
