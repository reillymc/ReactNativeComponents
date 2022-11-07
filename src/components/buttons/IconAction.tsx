import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ColorValue, Pressable, StyleSheet, View, ViewStyle } from "react-native";

import { ActionSize, ActionVariant } from ".";
import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { Theme } from "../../theme";
import { Text } from "../Text";

const getLabelColor = ({ color }: Theme, variant: ActionVariant, pressed: boolean): ColorValue => {
    switch (variant) {
        case "primary":
            return pressed ? color.primaryHighlight : color.primary;
        case "secondary":
            return pressed ? color.secondaryHighlight : color.secondary;
        case "flat":
            return pressed ? color.textHighlight : color.textPrimary;
    }
};

export type IconActionStyles = {
    size: { [key in ActionSize]: number };
};

export interface IconActionProps {
    iconName: keyof typeof AntDesign.glyphMap;
    label?: string;
    variant?: ActionVariant;
    style?: ViewStyle;
    size?: ActionSize;
    disabled?: boolean;
    onPress: () => void;
}

export const IconAction: React.FC<IconActionProps> = ({
    iconName,
    label,
    variant = "flat",
    size = "regular",
    disabled,
    style,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { variant, size });
    const { theme } = useTheme();

    return (
        <Pressable hitSlop={30} disabled={disabled} style={style} onPress={onPress}>
            {({ pressed }) => (
                <View style={styles.container}>
                    <AntDesign
                        name={iconName}
                        type="font-awesome"
                        size={styles.icon.height}
                        color={getLabelColor(theme, variant, pressed)}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>{label}</Text>
                </View>
            )}
        </Pressable>
    );
};

IconAction.displayName = "IconAction";

const createStyles = ({ styles: { iconAction } }: ThemedStyles, { size = "regular" }: Partial<IconActionProps>) =>
    StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        icon: {
            height: iconAction.size[size],
            width: iconAction.size[size],
        },
        text: {
            marginLeft: 6,
        },
    });
