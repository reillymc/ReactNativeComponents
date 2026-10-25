import type { ThemeFactory } from "../theme/theme";

export const defaultIconBaseTheme: ThemeFactory<"iconBase"> = ({ theme }) => ({
    color: theme.text.color,
    size: 20,
});
