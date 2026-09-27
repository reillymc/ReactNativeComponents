import type { Theme } from "../../theme/theme";
import type { TagStyles } from "./Tag";

export const defaultTagStyles = ({ border, spacing }: Theme): TagStyles => ({
    borderRadius: border.radius.loose,
    internalSpacing: spacing.small,
    padding: spacing.small,
});
