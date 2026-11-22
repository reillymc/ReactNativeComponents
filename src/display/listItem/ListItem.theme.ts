import type { ThemeFactory } from "../../theme/theme";

export const defaultListItemTheme: ThemeFactory<"listItem"> = ({
    palette: { border, color, spacing },
    theme,
}) => ({
    surface: {
        backgroundColor: color.surface,
        borderRadius: border.radius.loose,
        paddingTop: spacing.medium,
        paddingBottom: spacing.medium,
        paddingStart: spacing.medium,
        paddingEnd: spacing.medium,
    },
    swipeActions: theme.swipeActionContainer,
    internalGap: spacing.medium,
    textColor: color.surfaceForeground,
});
