import type { FC, ReactNode } from "react";
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

/**
 * Icon sets are generic over their own glyph-name union, which makes
 * `IconSet<G>` contravariant in `G` and therefore not mutually assignable.
 * `AnyIconSet` uses a bivariant method signature (with optional item props) so a
 * heterogeneous map of icon sets can be stored while keeping `name` as `string`.
 */
export type AnyIconSet = {
    bivarianceHack(
        props: { name: string } & Partial<IconSetItemProps> & object,
    ): ReactNode | Promise<ReactNode>;
}["bivarianceHack"];

export type IconSetGlyphMap<T extends string> = Record<T, FC<IconSetItemProps>>;
