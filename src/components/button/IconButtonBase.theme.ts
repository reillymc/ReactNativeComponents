import type { ThemeFactory } from "../../theme/theme";

export const defaultIconButtonBaseTheme: ThemeFactory<"iconButtonBase"> = ({
    palette,
    theme,
}) => ({
    container: {
        padding: 4,
        size: 48,
        backgroundColor: palette.color.inset,
        borderRadius: "50%",
    },
    icon: {
        size: theme.iconBase.size,
        color: theme.iconBase.color,
    },
});
