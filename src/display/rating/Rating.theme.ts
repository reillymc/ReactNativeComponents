import type { ThemeFactory } from "../../theme/theme";

export const defaultRatingTheme: ThemeFactory<"rating"> = ({
    palette,
    theme,
}) => ({
    gap: palette.spacing.tiny,
    icon: {
        color: {
            empty: palette.color.mutedForeground,
            half: palette.color.primary,
            full: palette.color.primary,
        },
        size: theme.iconBase.size * 1.2,
    },
});
