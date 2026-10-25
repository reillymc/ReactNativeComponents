import type { ThemeFactory } from "../../theme/theme";

export const defaultInputActionTheme: ThemeFactory<"inputAction"> = ({
    theme,
}) => ({
    color: theme.inputBase.text.color.enabled,
    height: theme.inputBase.container.height,
    backgroundColor: theme.inputBase.container.backgroundColor,
});
