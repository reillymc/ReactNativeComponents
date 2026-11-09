import type { ThemeFactory } from "../../theme/theme";

export const defaultIconButtonBaseTheme: ThemeFactory<"iconButtonBase"> = ({
    palette,
    theme,
}) => ({
    container: {
        padding: 4,
        gap: palette.spacing.tiny,
        size: 48,
        backgroundColor: palette.color.inset,
        borderRadius: "50%",
    },
    icon: {
        size: theme.iconBase.size,
        color: palette.color.insetForeground,
    },
    label: {
        color: theme.text.color,
        font: theme.text.font.caption,
    },
});
