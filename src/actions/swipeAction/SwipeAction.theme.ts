import type { ThemeFactory } from "../../theme/theme";

export const defaultSwipeActionTheme: ThemeFactory<"swipeAction"> = ({
    palette,
    theme,
}) => ({
    width: 72,
    borderRadius: palette.border.radius.loose,
    gap: palette.spacing.tiny,
    button: theme.iconButton,
});
