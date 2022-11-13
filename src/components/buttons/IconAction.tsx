import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ColorValue, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";

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
        case "destructive":
            return pressed ? color.destructiveHighlight : color.destructive;
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
    size?: ActionSize;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<TextStyle>;
    onPress: () => void;
}

export const IconAction: React.FC<IconActionProps> = ({
    iconName,
    label,
    variant = "flat",
    size = "regular",
    disabled,
    containerStyle,
    iconStyle,
    onPress,
}) => {
    const styles = useThemedStyles(createStyles, { variant, size });
    const { theme } = useTheme();

    return (
        <Pressable hitSlop={30} disabled={disabled} style={containerStyle} onPress={onPress}>
            {({ pressed }) => (
                <View style={styles.container}>
                    <AntDesign
                        name={iconName}
                        type="font-awesome"
                        size={styles.icon.height}
                        color={getLabelColor(theme, variant, pressed)}
                        style={[styles.icon, iconStyle]}
                    />
                    <Text numberOfLines={1} style={styles.text}>
                        {label}
                    </Text>
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
