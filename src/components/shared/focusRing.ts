import type { ColorValue } from "react-native";

import type { Palette } from "../../theme/palette";

export type FocusRingTheme = {
    color: string;
    width: number;
    offset: number;
    radius: number;
};

let hasWarnedAboutFocusRingColor = false;

const resolveFocusRingColor = (color: ColorValue): string => {
    if (typeof color === "string") return color;

    if (
        !hasWarnedAboutFocusRingColor &&
        typeof __DEV__ !== "undefined" &&
        __DEV__
    ) {
        hasWarnedAboutFocusRingColor = true;
        console.warn(
            "Focus ring colors must be strings. Falling back to transparent.",
        );
    }

    return "transparent";
};

export const createDefaultFocusRing = ({
    border,
    color,
}: Palette): FocusRingTheme => ({
    color: resolveFocusRingColor(color.primary),
    width: border.width.regular,
    offset: border.width.regular,
    radius: border.radius.tight,
});

export type FocusRingStyle = {
    outlineColor: string;
    outlineStyle: "solid";
    outlineWidth: number;
    outlineOffset?: number;
    borderRadius?: number;
};

export const createFocusRingStyle = (
    { color, width, offset, radius }: FocusRingTheme,
    visible: boolean,
): FocusRingStyle =>
    visible
        ? {
              outlineColor: color,
              outlineOffset: offset,
              outlineStyle: "solid",
              outlineWidth: width,
              borderRadius: radius,
          }
        : {
              outlineColor: "transparent",
              outlineStyle: "solid",
              outlineWidth: 0,
          };
