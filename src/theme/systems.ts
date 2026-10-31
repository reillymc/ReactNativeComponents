import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { mergeTheme } from "./mergeTheme";
import type { Palette } from "./palette";

export type FocusRingTheme = {
    color: string;
    /** @default 1 */
    width: number;
    /** @default 1 */
    offset: number;
};

export type StateValues = {
    /** @default 0.08 */
    hoverOpacity: number;
    /** @default 0.2 */
    pressedOpacity: number;
    /** @default 50 */
    pressDuration: number;
    /** @default 100 */
    hoverDuration: number;
};

export type ShadowValues = {
    color: ColorValue;
    /** @default 0.08 */
    opacity: number;
    /** @default 16 */
    radius: number;
    offset: {
        /** @default 0 */
        width: number;
        /** @default 2 */
        height: number;
    };
    /** @default 8 */
    elevation: number;
};

export type Systems = {
    interaction: {
        focusRing: FocusRingTheme;
        disabled: {
            /** @default 0.5 */
            opacity: number;
        };
        state: StateValues;
    };
    shadow: ShadowValues;
    accessibility: {
        /** @default 1.2 */
        maxFontSizeMultiplier: number;
    };
    touch: {
        hitSlop: {
            /** @default 16 */
            default: number;
            /** @default 20 */
            large: number;
        };
    };
};

export type SystemsOverrides = DeepPartial<Systems>;

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
});

const createDefaultSystems = (palette: Palette): Systems => ({
    interaction: {
        focusRing: createDefaultFocusRing(palette),
        disabled: {
            opacity: 0.5,
        },
        state: {
            hoverOpacity: 0.08,
            pressedOpacity: 0.2,
            pressDuration: 50,
            hoverDuration: 100,
        },
    },
    shadow: {
        color: "#000000",
        opacity: 0.08,
        radius: 16,
        offset: {
            width: 0,
            height: 2,
        },
        elevation: 8,
    },
    accessibility: {
        maxFontSizeMultiplier: 1.2,
    },
    touch: {
        hitSlop: {
            default: 16,
            large: 20,
        },
    },
});

export const createSystems = (
    palette: Palette,
    overrides?: SystemsOverrides,
): Systems => mergeTheme(createDefaultSystems(palette), overrides);
