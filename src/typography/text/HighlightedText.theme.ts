import type { ThemeFactory } from "../../theme/theme";

export const defaultHighlightedTextTheme: ThemeFactory<
    "highlightedText"
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
