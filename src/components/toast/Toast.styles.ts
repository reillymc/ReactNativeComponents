import type { Theme } from "../../theme/theme";
import type { ToastStyles } from "./Toast";

export const defaultToastStyles = ({
    color,
    spacing,
    border,
}: Theme): ToastStyles => ({
    container: {
        backgroundColor: color.backgroundHighlight,
        padding: spacing.medium,
        borderRadius: border.radius.loose,
    },
});
