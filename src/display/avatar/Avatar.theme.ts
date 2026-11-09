import type { ThemeFactory } from "../../theme/theme";

export const defaultAvatarTheme: ThemeFactory<"avatar"> = ({
    palette: { color, font, spacing },
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
        paddingHorizontal: spacing.small,
    },
    colors: [
        { background: color.tint1, foreground: color.foreground },
        { background: color.tint2, foreground: color.foreground },
        { background: color.tint3, foreground: color.foreground },
        { background: color.tint4, foreground: color.foreground },
        { background: color.tint5, foreground: color.foreground },
    ],
});
