import type { StyleFactory } from "../../style/styleFactory";

export interface TagStyles {
    internalSpacing: number;
    borderRadius: number;
    padding: number;
}

export const defaultTagStyles: StyleFactory<TagStyles> = ({
    border,
    spacing,
}) => ({
    borderRadius: border.radius.loose,
    internalSpacing: spacing.small,
    padding: spacing.small,
});
