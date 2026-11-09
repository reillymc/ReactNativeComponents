import type { TextStyle } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";
import type { TextVariant } from "./Text.styles";

export interface HighlightedTextStyles {
    highlightedWeight: Record<TextVariant, TextStyle["fontWeight"]>;
}

export const defaultHighlightedTextStyles: StyleFactory<
    HighlightedTextStyles
> = () => ({
    highlightedWeight: {
        body: "800",
        caption: "800",
        display: "800",
        heading: "800",
        label: "800",
        title: "800",
    },
});
