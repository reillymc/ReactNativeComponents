import type { ThemeFactory } from "../../theme/theme";

export const defaultListItemTheme: ThemeFactory<"listItem"> = ({
    palette: { border, color, spacing },
}) => ({
    surface: {
        backgroundColor: color.surface,
        borderRadius: border.radius.loose,
        paddingTop: spacing.medium,
        paddingBottom: spacing.medium,
        paddingStart: spacing.medium,
        paddingEnd: spacing.medium,
    },
    internalGap: spacing.medium,
    textColor: color.surfaceForeground,
});
