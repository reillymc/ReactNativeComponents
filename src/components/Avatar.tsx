import type React from "react";
import {
    type ColorValue,
    Image,
    type StyleProp,
    StyleSheet,
    Text,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../hooks";

const getBackgroundColor = (
    colors: Array<{ background: ColorValue; foreground: ColorValue }>,
    firstName: string | undefined,
    lastName: string | undefined,
): { background: ColorValue; foreground: ColorValue } => {
    const hash =
        (firstName || lastName || "")
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

    return (
        colors[hash] ?? colors[0] ?? { background: "#fff", foreground: "#000" }
    );
};

type AvatarSize = "small" | "regular" | "large";

export type AvatarStyles = {
    size: { [Key in AvatarSize]: number };
    initials: {
        fontFamilyWeight: string;
        fontSize: Record<AvatarSize, number>;
    };
    label: {
        fontFamilyWeight: string;
        fontSize: number;
    };
    colors: Array<{ background: ColorValue; foreground: ColorValue }>;
};

export interface AvatarProps {
    firstName?: string;
    lastName?: string;
    /**
     * Supports:
     * - `<IconAction/>`
     */

    imageUri?: string;

    size?: AvatarSize;

    action?: React.ReactNode;

    style?: DeepPartial<AvatarStyles>;

    containerStyle?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
    firstName = "",
    lastName = "",
    imageUri,
    size = "regular",
    action,
    style,
    containerStyle,
}) => {
    const [styles] = useThemedStylesWithOverride(
        createStyles,
        { avatar: style },
        { size, firstName, lastName },
    );

    const initials =
        `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    return (
        <View style={[styles.container, containerStyle]}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <>
                    <Text style={styles.initials}>{initials}</Text>
                    {size === "large" && (
                        <Text numberOfLines={3} style={[styles.label]}>
                            {`${firstName} ${lastName}`}
                        </Text>
                    )}
                </>
            )}
            {action && size !== "small" && (
                <View style={styles.action}>{action}</View>
            )}
        </View>
    );
};

Avatar.displayName = "Avatar";

const createStyles = (
    { styles: { avatar }, theme: { spacing } }: ThemedStyles,
    {
        size = "regular",
        firstName,
        lastName,
    }: Required<Pick<AvatarProps, "size" | "firstName" | "lastName">>,
) => {
    const { background, foreground } = getBackgroundColor(
        avatar.colors,
        firstName,
        lastName,
    );

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: background,
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
            fontFamily: avatar.initials.fontFamilyWeight,
            fontSize: avatar.initials.fontSize[size],
            color: foreground,
        },
        label: {
            fontSize: avatar.label.fontSize,
            fontFamily: avatar.label.fontFamilyWeight,
            paddingHorizontal: spacing.small,
            textAlign: "center",
            color: foreground,
        },
        action: {
            position: "absolute",
            top: -spacing.tiny,
            right: -spacing.small,
        },
    });
    return styles;
};
