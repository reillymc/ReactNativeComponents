import type { ThemeFactory } from "../../theme/theme";

export const defaultAlertIndicatorTheme: ThemeFactory<"alertIndicator"> = ({
    palette: { color },
}) => ({
    size: 28,
    borderRadius: 14,
    backgroundColor: {
        primary: color.primary,
        secondary: color.secondary,
    },
    color: {
        primary: color.primaryForeground,
        secondary: color.secondaryForeground,
    },
});
