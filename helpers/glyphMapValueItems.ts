/** biome-ignore-all lint/suspicious/noExplicitAny: any required for generic use case */
import { AntDesign, Octicons } from "@expo/vector-icons";
import type { ValueItem } from "@reillymc/react-native-components";

type Glyphs = keyof (typeof AntDesign)["glyphMap"];
const glyphs = Object.keys(AntDesign.glyphMap) as Array<Glyphs>;

export const glyphMapValueItems: ValueItem<Glyphs>[] = glyphs.map((name) => ({
    label: name,
    value: name as any,
}));

export const glyphMapValueItemsNullable: ValueItem<Glyphs | undefined>[] = [
    { id: "None", label: "None", value: undefined },
    ...glyphMapValueItems,
];

type GlyphsOcticons = keyof (typeof Octicons)["glyphMap"];
const glyphsOcticons = Object.keys(Octicons.glyphMap) as Array<GlyphsOcticons>;

export const glyphMapValueItemsOcticons: ValueItem<GlyphsOcticons>[] =
    glyphsOcticons.map((name) => ({
        label: name,
        value: name as any,
    }));

export const glyphMapValueItemsNullableOcticons: ValueItem<
    GlyphsOcticons | undefined
>[] = [
    { id: "None", label: "None", value: undefined },
    ...glyphMapValueItemsOcticons,
];
