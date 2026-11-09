import type { ThemeFactory } from "../../theme/theme";

export const defaultTextBaseTheme: ThemeFactory<"textBase"> = ({
    palette: { color, font },
}) => ({
    color: color.foreground,
    font: {
        family: font.family.sans,
        weight: "400",
        size: font.size.regular,
    },
});
