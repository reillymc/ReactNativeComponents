import type { ThemeFactory } from "../../theme/theme";

export const defaultToastTheme: ThemeFactory<"toast"> = ({
    palette: { color, spacing, border },
}) => ({
    container: {
        backgroundColor: color.elevated,
        padding: spacing.medium,
        borderRadius: border.radius.loose,
    },
    borderColor: color.border,
    borderWidth: border.width.thin,
    separatorColor: color.mutedForeground,
    separatorMarginHorizontal: spacing.medium,
});
