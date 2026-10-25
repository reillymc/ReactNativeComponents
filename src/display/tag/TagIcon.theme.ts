import type { ThemeFactory } from "../../theme/theme";

export const defaultTagIconTheme: ThemeFactory<"tagIcon"> = ({
    palette,
    theme,
}) => ({
    size: theme.text.font.body.size,
    color: palette.color.foreground,
});
