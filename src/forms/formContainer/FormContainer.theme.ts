import type { ThemeFactory } from "../../theme/theme";

export const defaultFormContainerTheme: ThemeFactory<"formContainer"> = ({
    palette: { spacing },
}) => ({
    gap: spacing.medium,
});
