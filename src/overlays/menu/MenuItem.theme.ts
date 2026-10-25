import type { ThemeFactory } from "../../theme/theme";

export const defaultMenuItemTheme: ThemeFactory<"menuItem"> = ({
    palette,
    theme,
}) => ({
    paddingHorizontal: theme.inputBase.container.padding - theme.menu.padding,
    paddingVertical: palette.spacing.small + palette.spacing.tiny,
    borderRadius: palette.border.radius.tight,
    textColor: theme.menu.textColor,
});
