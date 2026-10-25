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
            tiny: number;
            small: number;
            regular: number;
            large: number;
            xLarge: number;
            xxLarge: number;
        };
    };
    color: ColorScheme;
    spacing: {
        large: number;
        medium: number;
        small: number;
        tiny: number;
    };
    border: {
        radius: {
            tight: number;
            regular: number;
            loose: number;
        };
        width: {
            thick: number;
            regular: number;
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
