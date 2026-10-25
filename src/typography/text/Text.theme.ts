import type { ThemeFactory } from "../../theme/theme";

export const defaultTextTheme: ThemeFactory<"text"> = ({
    palette: { color, font },
}) => ({
    color: color.foreground,
    font: {
        caption: {
            family: font.family.sans,
            weight: "200",
            size: font.size.small,
        },
        body: {
            family: font.family.sans,
            weight: "400",
            size: font.size.regular,
        },
        label: {
            family: font.family.sans,
            weight: "500",
            size: font.size.large,
        },
        heading: {
            family: font.family.sans,
            weight: "600",
            size: font.size.large,
        },
        title: {
            family: font.family.sans,
            weight: "800",
            size: font.size.xLarge,
        },
        display: {
            family: font.family.sans,
            weight: "800",
            size: font.size.xxLarge,
        },
    },
});
