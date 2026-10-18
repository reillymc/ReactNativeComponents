import type { Theme } from "../../theme/theme";
import type { AvatarStyles } from "./Avatar";

export const defaultAvatarStyles = ({ color, font }: Theme): AvatarStyles => ({
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
        { background: color.tint1, foreground: color.foreground },
        { background: color.tint2, foreground: color.foreground },
        { background: color.tint3, foreground: color.foreground },
        { background: color.tint4, foreground: color.foreground },
        { background: color.tint5, foreground: color.foreground },
    ],
});
