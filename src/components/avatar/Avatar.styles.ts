import type { ColorValue, TextStyle } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export type AvatarSize = "small" | "regular" | "large";

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

export const defaultAvatarStyles: StyleFactory<AvatarStyles> = ({
    color,
    font,
}) => ({
    size: {
        large: 80,
        regular: 40,
        small: 32,
    },
    initials: {
        fontWeight: "600",
        fontSize: {
            large: font.size.xxLarge,
            regular: font.size.xLarge,
            small: font.size.large,
        },
    },
    label: {
        fontSize: font.size.tiny,
        fontWeight: "500",
    },
    colors: [
        { background: color.red, foreground: color.textPrimary },
        { background: color.orange, foreground: color.textPrimary },
        { background: color.green, foreground: color.textPrimary },
        { background: color.blue, foreground: color.textPrimary },
        { background: color.purple, foreground: color.textPrimary },
    ],
});
