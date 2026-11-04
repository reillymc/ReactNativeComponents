import type { ThemeFactory } from "../../theme/theme";

export const defaultSwipeActionTheme: ThemeFactory<"swipeAction"> = ({
    palette,
}) => ({
    width: 60,
    borderRadius: palette.border.radius.loose,
});
