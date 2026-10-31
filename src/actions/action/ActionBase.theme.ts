import type { ThemeFactory } from "../../theme/theme";

export const defaultActionBaseTheme: ThemeFactory<"actionBase"> = ({
    palette,
}) => ({
    borderRadius: palette.border.radius.tight,
});
