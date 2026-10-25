import type { ThemeFactory } from "../../theme/theme";

export const defaultInputActionTheme: ThemeFactory<"inputAction"> = ({
    theme,
}) => ({
    color: theme.action.label.color.secondary,
    height: theme.inputBase.container.height,
    backgroundColor: theme.inputBase.container.backgroundColor,
});
