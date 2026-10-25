import type { ThemeFactory } from "../../theme/theme";

export const defaultTimeInputTheme: ThemeFactory<"timeInput"> = ({
    theme,
}) => ({
    padding: theme.inputBase.container.padding,
    height: theme.inputBase.container.height,
});
