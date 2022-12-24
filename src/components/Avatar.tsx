import React from "react";
import { Text, StyleSheet, View, StyleProp, ViewStyle, Image } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../hooks";
import { Theme } from "../theme";
import { ActionSize } from "./buttons";

const getBackgroundColor = (theme: Theme, firstName: string | undefined, lastName: string | undefined) => {
    const colors = [theme.color.red, theme.color.orange, theme.color.green, theme.color.blue, theme.color.purple];
    const hash =
        (firstName || lastName || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

    return colors[hash] ?? theme.color.red;
};

export type AvatarStyles = {
    initialsFontFamilyWeight: string;
    size: { [key in ActionSize]: number };
    initialsFontSize: number;
    labelFontSize: number;
};

export interface AvatarProps {
    firstName?: string;
    lastName?: string;
    /**
     * Supports:
     * - `<IconAction/>`
     */

    imageUri?: string;

    size?: ActionSize;

    action?: React.ReactNode;

    style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({ firstName = "", lastName = "", imageUri, size, action, style }) => {
    const styles = useThemedStyles(createStyles, { size });
    const { theme } = useTheme();

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor(theme, firstName, lastName) }, style]}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <>
                    <Text style={[styles.initials]}>{initials}</Text>
                    {size === "large" && (
                        <Text numberOfLines={2} style={[styles.label]}>
                            {`${firstName} ${lastName}`}
                        </Text>
                    )}
                </>
            )}
            {action && size === "large" && <View style={styles.action}>{action}</View>}
        </View>
    );
};

Avatar.displayName = "Avatar";

const createStyles = (
    { styles: { avatar }, theme: { font } }: ThemedStyles,
    { size = "regular" }: Partial<AvatarProps>,
) =>
    StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: avatar.size[size],
            width: avatar.size[size],
            borderRadius: avatar.size[size] / 2,
        },
        image: {
            height: avatar.size[size],
            width: avatar.size[size],
            borderRadius: avatar.size[size] / 2,
        },
        initials: {
            fontFamily: avatar.initialsFontFamilyWeight,
            fontSize: size === "large" ? avatar.initialsFontSize : font.size.emphasised,
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
