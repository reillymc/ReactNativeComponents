import type { StyleFactory } from "../../../style/styleFactory";

export type AnchoredContainerStyles = {
    parentMargin: number;
};

export const defaultAnchoredContainerStyles: StyleFactory<
    AnchoredContainerStyles
> = ({ spacing }) => ({
    parentMargin: spacing.small,
});
