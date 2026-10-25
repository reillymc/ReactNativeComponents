import type { ThemeFactory } from "../../theme/theme";

export const defaultActionTheme: ThemeFactory<"action"> = ({
    palette: { color },
}) => ({
    label: {
        color: {
            primary: color.primary,
            secondary: color.foreground,
            destructive: color.destructive,
        },
    },
});
