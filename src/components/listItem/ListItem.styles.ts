import type { Theme } from "../../theme/theme";
import type { ListItemStyles } from "./ListItem";

export const defaultListItemStyles = ({ border }: Theme): ListItemStyles => ({
    spacingMargin: 12,
    internalSpacing: 16,
    borderRadius: border.radius.loose,
    contentItemSpacing: 8,
    contentItemTopMargin: 4,
});
