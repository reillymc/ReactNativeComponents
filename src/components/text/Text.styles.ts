import type { Theme } from "../../theme/theme";
import type { TextStyles } from "./Text";

export const defaultTextStyles = ({ color, font }: Theme): TextStyles => ({
    color: color.textPrimary,
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
            size: font.size.emphasised,
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
