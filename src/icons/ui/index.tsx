// Glyph path data derived from GitHub Octicons (https://github.com/primer/octicons),
// MIT licensed. See THIRD_PARTY_NOTICES.md.

import type { IconSet, IconSetGlyphMap } from "../base";
import { ArrowBoth } from "./ArrowBoth";
import { ChevronDown } from "./ChevronDown";
import { Circle } from "./Circle";
import { Clock } from "./Clock";
import { Dash } from "./Dash";
import { Exclamation } from "./Exclamation";
import { InfinityGlyph } from "./InfinityGlyph";
import { NumberGlyph } from "./NumberGlyph";
import { Plus } from "./Plus";
import { StarBorder } from "./StarBorder";
import { StarFull } from "./StarFull";
import { StarHalf } from "./StarHalf";

export type UiIconName =
    | "exclamation"
    | "dash"
    | "plus"
    | "infinity"
    | "number"
    | "arrow-both"
    | "chevron-down"
    | "clock"
    | "circle"
    | "star-empty"
    | "star-half"
    | "star-full";

const glyphMap: IconSetGlyphMap<UiIconName> = {
    exclamation: Exclamation,
    dash: Dash,
    plus: Plus,
    infinity: InfinityGlyph,
    number: NumberGlyph,
    "arrow-both": ArrowBoth,
    "chevron-down": ChevronDown,
    clock: Clock,
    circle: Circle,
    "star-empty": StarBorder,
    "star-half": StarHalf,
    "star-full": StarFull,
};

export const UiIcons: IconSet<UiIconName> = ({ name, color, size }) => {
    const Glyph = glyphMap[name];

    if (!Glyph) return null;

    return <Glyph color={color} size={size} />;
};
