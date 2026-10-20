import type { StyleFactory } from "../../style/styleFactory";

export type SwipeActionStyles = {
    width: number;
};

export const defaultSwipeActionStyles: StyleFactory<
    SwipeActionStyles
> = () => ({
    width: 75,
});
