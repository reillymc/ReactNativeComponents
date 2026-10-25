import type { ThemeFactory } from "../../theme/theme";

export const defaultFormRowTheme: ThemeFactory<"formRow"> = ({
    palette: { spacing },
}) => ({
    gap: spacing.small,
});
