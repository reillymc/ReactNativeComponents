import { AntDesign, Octicons } from "@expo/vector-icons";
import { ValueItem } from "@reillymc/react-native-components";

type Glyphs = keyof (typeof AntDesign)["glyphMap"];
const glyphs = Object.keys(AntDesign.glyphMap) as Array<Glyphs>;

export const glyphMapValueItems: ValueItem<Glyphs>[] = glyphs.map(name => ({
    label: name,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: name as any,
}));

export const glyphMapValueItemsNullable: ValueItem<Glyphs | undefined>[] = [
    { id: "None", label: "None", value: undefined },
    ...glyphMapValueItems,
];

type GlyphsOcticons = keyof (typeof Octicons)["glyphMap"];
const glyphsOcticons = Object.keys(Octicons.glyphMap) as Array<GlyphsOcticons>;

export const glyphMapValueItemsOcticons: ValueItem<GlyphsOcticons>[] = glyphsOcticons.map(name => ({
    label: name,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: name as any,
}));

export const glyphMapValueItemsNullableOcticons: ValueItem<GlyphsOcticons | undefined>[] = [
    { id: "None", label: "None", value: undefined },
    ...glyphMapValueItemsOcticons,
];
