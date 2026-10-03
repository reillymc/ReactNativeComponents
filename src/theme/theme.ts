import { Platform } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

import { lightPalette } from "./palette";

export type Theme = typeof DefaultTheme;

export type ThemeOverrides = DeepPartial<Theme>;

export const DefaultTheme = {
    font: {
        family: {
            sans: Platform.select({
                ios: "System",
                android: "sans-serif",
                default: "system-ui",
            }),
            mono: Platform.select({
                ios: "Menlo",
                android: "monospace",
                default: "monospace",
            }),
        },
        size: {
            tiny: 10,
            small: 12,
            regular: 14,
            large: 16,
            xLarge: 20,
            xxLarge: 28,
        },
    },
    color: lightPalette,
    spacing: {
        large: 24,
        medium: 16,
        small: 8,
        tiny: 4,
    },
    border: {
        radius: {
            tight: 4,
            regular: 8,
            loose: 16,
        },
        width: {
            thick: 4,
            regular: 2,
            thin: 1,
        },
    },
};

export const MergeTheme = <E extends object = Record<never, never>>(
    first?: ThemeOverrides & E,
    second?: ThemeOverrides & DeepPartial<NoInfer<E>>,
): Theme & E => merge({}, DefaultTheme, first ?? {}, second ?? {}) as Theme & E;

/**
 * Builds a complete theme from a single set of base overrides, optionally
 * deriving additional app-owned tokens from the resolved base theme.
 */
export const createTheme = <E extends object = Record<never, never>>(
    overrides?: ThemeOverrides,
    createExtras?: (theme: Theme) => E,
): Theme & E => {
    const base = MergeTheme(overrides);

    return createExtras
        ? (merge({}, base, createExtras(base)) as Theme & E)
        : (base as Theme & E);
};
