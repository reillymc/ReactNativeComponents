import type { IconSet, IconSetGlyphMap } from "../base";
import { StarBorder } from "./StarBorder";
import { StarFull } from "./StarFull";
import { StarHalf } from "./StarHalf";

export type StarsIconName = "empty" | "half" | "full";

const glyphMap: IconSetGlyphMap<StarsIconName> = {
    empty: StarBorder,
    full: StarFull,
    half: StarHalf,
};

export const Stars: IconSet<StarsIconName> = ({ name, color, size }) => {
    const Glyph = glyphMap[name];

    if (!Glyph) return <StarBorder color={color} size={size} />;
    return <Glyph color={color} size={size} />;
};
