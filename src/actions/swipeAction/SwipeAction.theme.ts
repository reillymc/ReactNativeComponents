import type { ThemeFactory } from "../../theme/theme";

export const defaultSwipeActionTheme: ThemeFactory<"swipeAction"> = ({
    palette,
    theme,
}) => ({
    container: {
        width: 60,
        borderRadius: palette.border.radius.loose,
    },
    button: theme.iconButton,
});
