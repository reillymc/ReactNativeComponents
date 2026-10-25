import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    Image,
    type StyleProp,
    type TextStyle,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, type PropFilter, useComponent } from "../../internal";
import { Text } from "../../typography/text";

type AvatarColorSet = { background: ColorValue; foreground: ColorValue };
type AvatarColorSets = [AvatarColorSet, ...AvatarColorSet[]];

const getBackgroundColor = (
    colors: AvatarColorSets,
    firstName: string | undefined,
    lastName: string | undefined,
): AvatarColorSet => {
    const name = firstName || lastName || "";
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = (hash + name.charCodeAt(i)) % colors.length;
    }

    return colors[hash] ?? colors[0];
};

type AvatarSize = "small" | "regular" | "large";

export type AvatarTheme = {
    size: { [Key in AvatarSize]: number };
    initials: {
        fontWeight: TextStyle["fontWeight"];
        fontSize: Record<AvatarSize, number>;
    };
    label: {
        fontWeight: TextStyle["fontWeight"];
        fontSize: number;
        paddingHorizontal: number;
    };
    colors: AvatarColorSets;
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

    theme?: DeepPartial<AvatarTheme>;

    style?: StyleProp<ViewStyle>;
}

export const Avatar: FC<AvatarProps> = ({
    firstName = "",
    lastName = "",
    imageUri,
    size = "regular",
    action,
    theme: themeOverrides,
    style,
}) => {
    const { styles } = useComponent("avatar", {
        themeOverrides,
        props: { size, firstName, lastName },
        createStyles,
    });

    const initials =
        `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    return (
        <View style={[styles.container, style]}>
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

const createStyles = defineStyles(
    (
        theme: AvatarTheme,
        props: PropFilter<AvatarProps, "size" | "firstName" | "lastName">,
    ) => {
        const { background, foreground } = getBackgroundColor(
            theme.colors,
            props.firstName,
            props.lastName,
        );

        return {
            container: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: background,
                height: theme.size[props.size],
                width: theme.size[props.size],
                borderRadius: theme.size[props.size] / 2,
            },
            image: {
                height: theme.size[props.size],
                width: theme.size[props.size],
                borderRadius: theme.size[props.size] / 2,
            },
            initials: {
                fontWeight: theme.initials.fontWeight,
                fontSize: theme.initials.fontSize[props.size],
                color: foreground,
            },
            label: {
                fontSize: theme.label.fontSize,
                fontWeight: theme.label.fontWeight,
                paddingHorizontal: theme.label.paddingHorizontal,
                textAlign: "center",
                color: foreground,
            },
            action: {
                position: "absolute",
                top: -4,
                end: -8,
            },
        };
    },
);
