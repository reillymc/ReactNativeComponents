import type { ThemeFactory } from "../../theme/theme";

export const defaultInputRowContainerTheme: ThemeFactory<
    "inputRowContainer"
> = ({ theme }) => ({
    borderRadius: theme.inputBase.container.borderRadius,
    backgroundColor: theme.inputBase.container.backgroundColor,
});
