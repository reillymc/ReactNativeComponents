/** biome-ignore-all lint/suspicious/noExplicitAny: any required for generic use case */
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import GlyphMap from "@react-native-vector-icons/octicons/glyphmaps/Octicons.json" with {
    type: "json",
};
import type { ValueItem } from "@reillymc/react-native-components";

export const glyphMapValueItems: ValueItem<OcticonsIconName>[] = Object.keys(
    GlyphMap,
).map((name) => ({
    label: name,
    value: name as any,
}));

export const glyphMapValueItemsNullable: ValueItem<
    OcticonsIconName | undefined
>[] = [{ id: "None", label: "None", value: undefined }, ...glyphMapValueItems];
