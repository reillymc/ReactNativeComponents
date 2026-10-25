import type { ThemeFactory } from "../../theme/theme";

export const defaultContentRowTheme: ThemeFactory<"contentRow"> = ({
    palette: { spacing },
}) => ({
    gap: spacing.small,
});
