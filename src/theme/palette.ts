import { Platform, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ColorScheme, lightColorScheme } from "./colors";
import { mergeTheme } from "./mergeTheme";

export type Palette = {
    font: {
        family: {
            sans: string;
            mono: string;
        };
        size: {
            /** @default 10 */
            tiny: number;
            /** @default 12 */
            small: number;
            /** @default 14 */
            regular: number;
            /** @default 16 */
            large: number;
            /** @default 20 */
            xLarge: number;
            /** @default 28 */
            xxLarge: number;
        };
    };
    color: ColorScheme;
    spacing: {
        /** @default 24 */
        large: number;
        /** @default 16 */
        medium: number;
        /** @default 8 */
        small: number;
        /** @default 4 */
        tiny: number;
    };
    border: {
        radius: {
            /** @default 4 */
            tight: number;
            /** @default 8 */
            regular: number;
            /** @default 16 */
            loose: number;
        };
        width: {
            /** @default 2 */
            thick: number;
            /** @default 1 */
            regular: number;
            /** @default StyleSheet.hairlineWidth */
            thin: number;
        };
    };
};

export type PaletteOverrides = DeepPartial<Palette>;

export const defaultPalette: Palette = {
    font: {
        family: {
            sans:
                Platform.select({
                    ios: "System",
                    android: "sans-serif",
                    default: "system-ui",
                }) ?? "system-ui",
            mono:
                Platform.select({
                    ios: "Menlo",
                    android: "monospace",
                    default: "monospace",
                }) ?? "monospace",
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
    color: lightColorScheme,
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
            thick: 2,
            regular: 1,
            thin: StyleSheet.hairlineWidth,
        },
    },
};

export const createPalette = (overrides?: PaletteOverrides): Palette =>
    mergeTheme(defaultPalette, overrides);
