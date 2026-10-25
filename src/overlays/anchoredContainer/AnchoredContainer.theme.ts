import type { ThemeFactory } from "../../theme/theme";

export const defaultAnchoredContainerTheme: ThemeFactory<
    "anchoredContainer"
> = ({ palette: { spacing } }) => ({
    parentMargin: spacing.small,
});
