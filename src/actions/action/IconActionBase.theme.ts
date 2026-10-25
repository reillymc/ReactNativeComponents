import type { ThemeFactory } from "../../theme/theme";

export const defaultIconActionBaseTheme: ThemeFactory<"iconActionBase"> = ({
    palette,
}) => ({
    gap: palette.spacing.small,
    color: palette.color.foreground,
});
