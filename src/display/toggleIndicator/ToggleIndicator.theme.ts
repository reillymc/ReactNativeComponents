import type { ThemeFactory } from "../../theme/theme";

export const defaultToggleIndicatorTheme: ThemeFactory<"toggleIndicator"> = ({
    palette,
}) => ({
    surfaceSize: {
        compact: palette.font.size.large,
        regular: palette.font.size.xLarge,
    },
    iconSize: {
        compact: palette.font.size.large - palette.spacing.tiny,
        regular: palette.font.size.xLarge - palette.spacing.tiny,
    },
    color: {
        selected: {
            primary: palette.color.primary,
            secondary: palette.color.secondary,
        },
        deselected: palette.color.border,
        icon: {
            primary: palette.color.primaryForeground,
            secondary: palette.color.secondaryForeground,
        },
    },
});
