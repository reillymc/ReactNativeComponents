import type { ThemeFactory } from "../../theme/theme";

export const defaultRatingInputTheme: ThemeFactory<"ratingInput"> = ({
    palette,
    theme,
}) => ({
    container: {
        height: theme.inputBase.container.height,
        borderRadius: theme.inputBase.container.borderRadius,
        padding: theme.inputBase.container.padding,
        backgroundColor: theme.inputBase.container.backgroundColor,
    },
    icon: {
        color: theme.rating.icon.color,
    },
    gap: palette.spacing.tiny,
});
