import type { ThemeFactory } from "../../theme/theme";

export const defaultIconActionTheme: ThemeFactory<"iconAction"> = ({
    theme,
}) => ({
    color: theme.action.label.color,
});
