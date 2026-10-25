import type { ThemeFactory } from "../../theme/theme";

export const defaultListItemTheme: ThemeFactory<"listItem"> = ({
    palette: { border, color },
}) => ({
    spacingMargin: 12,
    internalSpacing: 16,
    borderRadius: border.radius.loose,
    backgroundColor: color.background,
    surfaceColor: color.surface,
});
