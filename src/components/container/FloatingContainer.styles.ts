import type { Theme } from "../../theme/theme";
import type { FloatingContainerStyles } from "./FloatingContainer";

export const defaultFloatingContainerStyles = ({
    spacing,
}: Theme): FloatingContainerStyles => ({
    parentMargin: spacing.small,
});
