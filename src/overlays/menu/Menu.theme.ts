import type { ThemeFactory } from "../../theme/theme";

export const defaultMenuTheme: ThemeFactory<"menu"> = ({ palette }) => ({
    backgroundColor: palette.color.elevated,
    borderRadius: palette.border.radius.regular,
    gap: palette.spacing.tiny,
    padding: palette.spacing.tiny,
    maxHeight: 240,
    textColor: palette.color.elevatedForeground,
});
