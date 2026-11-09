import type { StyleFactory } from "../../style/styleFactory";

export interface ListItemStyles {
    spacingMargin: number;
    internalSpacing: number;
    borderRadius: number;
    contentItemTopMargin: number;
    contentItemSpacing: number;
}

export const defaultListItemStyles: StyleFactory<ListItemStyles> = ({
    border,
}) => ({
    spacingMargin: 12,
    internalSpacing: 16,
    borderRadius: border.radius.loose,
    contentItemSpacing: 8,
    contentItemTopMargin: 4,
});
