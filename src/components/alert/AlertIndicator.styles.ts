import type { Theme } from "../../theme/theme";
import type { AlertIndicatorStyles } from "./AlertIndicator";

export const defaultAlertIndicatorStyles = ({
    color,
}: Theme): AlertIndicatorStyles => ({
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
