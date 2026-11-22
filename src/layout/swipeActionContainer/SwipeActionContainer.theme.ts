import type { ThemeFactory } from "../../theme/theme";

export const defaultSwipeActionContainerTheme: ThemeFactory<
    "swipeActionContainer"
> = ({ palette: { spacing } }) => ({
    actionsContainer: {
        margin: spacing.small,
        gap: spacing.tiny,
    },
});
