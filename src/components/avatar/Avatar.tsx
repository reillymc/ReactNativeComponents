import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    Image,
    type StyleProp,
    StyleSheet,
    type TextStyle,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { Text } from "../text";

const getBackgroundColor = (
    colors: Array<{ background: ColorValue; foreground: ColorValue }>,
    firstName: string | undefined,
    lastName: string | undefined,
): { background: ColorValue; foreground: ColorValue } | undefined => {
    const name = firstName || lastName || "";
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = (hash + name.charCodeAt(i)) % colors.length;
    }

    return colors[hash] ?? colors[0];
};

type AvatarSize = "small" | "regular" | "large";

export type AvatarStyles = {
    size: { [Key in AvatarSize]: number };
    initials: {
        fontWeight: TextStyle["fontWeight"];
        fontSize: Record<AvatarSize, number>;
    };
    label: {
        fontWeight: TextStyle["fontWeight"];
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

    action?: ReactNode;

    style?: DeepPartial<AvatarStyles>;

    containerStyle?: StyleProp<ViewStyle>;
}

export const Avatar: FC<AvatarProps> = ({
    firstName = "",
    lastName = "",
    imageUri,
    size = "regular",
    action,
    style,
    containerStyle,
}) => {
    const [styles] = useThemedStyles("avatar", createStyles, {
        styles: { avatar: style },
        props: { size, firstName, lastName },
    });

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
    { styles: { avatar }, theme: { spacing, color } }: ThemedStyles,
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
    ) ?? {
        background: color.muted,
        foreground: color.mutedForeground,
    };

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
            fontWeight: avatar.initials.fontWeight,
            fontSize: avatar.initials.fontSize[size],
            color: foreground,
        },
        label: {
            fontSize: avatar.label.fontSize,
            fontWeight: avatar.label.fontWeight,
            paddingHorizontal: spacing.small,
            textAlign: "center",
            color: foreground,
        },
        action: {
            position: "absolute",
            top: -spacing.tiny,
            end: -spacing.small,
        },
    });
    return styles;
};
