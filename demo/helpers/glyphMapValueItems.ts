import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import GlyphMap from "@react-native-vector-icons/octicons/glyphmaps/Octicons.json" with {
    type: "json",
};
import type { ValueItem } from "@reillymc/react-native-components/forms";

export const glyphMapValueItems = Object.keys(GlyphMap).map((name) => ({
    label: name,
    value: name,
})) as ValueItem<OcticonsIconName>[];
