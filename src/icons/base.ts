import type { FC } from "react";
import type { ColorValue } from "react-native";

export type IconSetItemProps = {
    size: number;
    color: ColorValue;
};

export type IconSet<G extends string> = FC<
    {
        name: G;
    } & IconSetItemProps &
        object
>;

export type IconSetGlyphMap<T extends string> = Record<T, FC<IconSetItemProps>>;
