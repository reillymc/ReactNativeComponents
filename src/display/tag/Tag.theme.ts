import type { ThemeFactory } from "../../theme/theme";

export const defaultTagTheme: ThemeFactory<"tag"> = ({
    palette: { border, color, spacing },
}) => ({
    borderRadius: border.radius.loose,
    internalSpacing: spacing.small,
    padding: spacing.small,
    backgroundColor: {
        dark: color.background,
        light: color.surface,
    },
    textColor: color.foreground,
});
