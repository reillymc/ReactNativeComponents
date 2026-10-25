import type { ThemeFactory } from "../../theme/theme";

export const defaultIconTheme: ThemeFactory<"icon"> = ({ theme }) => ({
    color: theme.iconBase.color,
    size: {
        small: theme.iconBase.size * 0.8,
        medium: theme.iconBase.size,
        large: theme.iconBase.size * 1.2,
    },
});
