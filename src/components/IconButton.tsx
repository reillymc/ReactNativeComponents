import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { ButtonProps, ButtonSize } from "./Button";

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

interface IconButtonProps extends ButtonProps {
    iconName: string;

    onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, label, size = "medium", disabled, onPress }) => {
    const dimensions = sizeToValue(size);

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }) => [
                styles.container,
                {
                    height: dimensions,
                    width: dimensions,
                    borderRadius: dimensions / 2,
                    backgroundColor: pressed ? "#fafafa" : "#f2f2f2",
                },
            ]}
            onPress={onPress}
        >
            <>
                <Icon
                    name={iconName}
                    type="font-awesome"
                    size={dimensions * 0.4}
                    color={disabled ? "#bbb" : "#000"}
                    tvParallaxProperties={null}
                    style={styles.icon}
                />
                {size !== "small" && label && (
                    <Text
                        style={[
                            styles.label,
                            {
                                fontSize: size === "large" ? 13 : 11,
                                color: disabled ? "#bbb" : "#000",
                                paddingTop: size === "large" ? 6 : 3,
                            },
                        ]}
                    >
                        {label}
                    </Text>
                )}
            </>
        </Pressable>
    );
};

export { IconButton };

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {},
    label: {
        fontFamily: "Comfortaa-Bold",
    },
});
