import React from "react";
import { Text, StyleSheet, View, StyleProp, ViewStyle } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../hooks";
import { Theme } from "../theme";

const getBackgroundColor = (theme: Theme, firstName: string | undefined, lastName: string | undefined) => {
    const colors = [theme.color.red, theme.color.orange, theme.color.green, theme.color.blue, theme.color.purple];
    const hash =
        (firstName || lastName || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

    return colors[hash] ?? theme.color.red;
};

export type AvatarStyles = {
    initialsFontFamilyWeight: string;
    size: number;
    initialsFontSize: number;
    labelFontSize: number;
};

export interface AvatarProps {
    firstName: string | undefined;
    lastName: string | undefined;
    /**
     * Supports:
     * - `<IconAction/>`
     */
    action?: React.ReactNode;

    style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, action, style }) => {
    const styles = useThemedStyles(createStyles, {});
    const { theme } = useTheme();

    const initials = `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor(theme, firstName, lastName) }, style]}>
            <Text style={[styles.initials]}>{initials}</Text>
            <Text numberOfLines={2} style={[styles.label]}>
                {`${firstName} ${lastName}`}
            </Text>
            <View style={styles.action}>{action}</View>
        </View>
    );
};

Avatar.displayName = "Avatar";

const createStyles = ({ styles: { avatar } }: ThemedStyles, {}: Partial<AvatarProps>) =>
    StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: avatar.size,
            width: avatar.size,
            borderRadius: avatar.size / 2,
        },
        initials: {
            fontFamily: avatar.initialsFontFamilyWeight,
            fontSize: avatar.initialsFontSize,
        },
        label: {
            fontSize: avatar.labelFontSize,
            paddingHorizontal: 16,
            paddingBottom: 12,
            textAlign: "center",
        },
        action: {
            position: "absolute",
            top: 0,
            right: -12,
        },
    });
