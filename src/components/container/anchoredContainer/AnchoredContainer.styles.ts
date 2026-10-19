import type { Theme } from "../../../theme/theme";
import type { AnchoredContainerStyles } from "./AnchoredContainer";

export const defaultAnchoredContainerStyles = ({
    spacing,
}: Theme): AnchoredContainerStyles => ({
    parentMargin: spacing.small,
});
