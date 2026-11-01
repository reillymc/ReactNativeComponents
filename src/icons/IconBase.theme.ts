import type { ThemeFactory } from "../theme/theme";

export const defaultIconBaseTheme: ThemeFactory<"iconBase"> = ({
    theme,
    palette,
}) => ({
    color: theme.text.color,
    size: palette.font.size.large,
});
