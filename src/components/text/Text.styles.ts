import type { TextStyle } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export type TextVariant =
    | "display"
    | "title"
    | "heading"
    | "label"
    | "body"
    | "caption";

export interface TextStyles {
    color: string;
    font: {
        [Variant in TextVariant]: {
            family: string;
            weight: TextStyle["fontWeight"];
            size: number;
        };
    };
}

export const defaultTextStyles: StyleFactory<TextStyles> = ({
    color,
    font,
}) => ({
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
