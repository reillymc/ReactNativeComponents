import type { Theme } from "../../theme/theme";
import type { IconActionBaseStyles } from "./IconActionBase";

export const defaultIconActionBaseStyles = (
    theme: Theme,
): IconActionBaseStyles => ({
    gap: theme.spacing.small,
    color: theme.color.foreground,
});
