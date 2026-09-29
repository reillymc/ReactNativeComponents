import { Platform } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";
import merge from "lodash.merge";

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
    color: {
        // Palette
        primary: "#FF4242",
        primaryDark: "#ff8585",
        primaryLight: "#ffbdbd",
        secondary: "#12263A",
        secondaryHighlight: "#718191",
        secondaryDisabled: "#B5EAD7",
        tertiary: "#06bcc1",

        destructive: "#ff382e",
        destructiveHighlight: "#ff9e96",

        light: "#F4EDEA",

        white: "#ffffff",
        black: "#000000",

        red: "#FF9AA2",
        orange: "#FFDAC1",
        green: "#E2F0CB",
        blue: "#B5EAD7",
        purple: "#C7CEEA",

        // Tokens
        textPrimary: "#12263A",
        textSecondary: "#22476D",
        textHighlight: "#30669c",
        textInverted: "#F4EDEA",
        textDisabled: "#B5EAD7",

        textOnPrimary: "#F4EDEA",
        textOnSecondary: "#F4EDEA",
        textOnDestructive: "#F4EDEA",

        background: "#F4EDEA",
        backgroundHighlight: "#f7f3f2",
        foreground: "#ffffff",
        foregroundHighlight: "#B5EAD7",
        backgroundOverlay: "#000",
        shadow: "#555",

        border: "#E2E8F0",

        inputBackground: "#e4d8d4",
        inputBackgroundDisabled: "#f0e9e2ff",
        inputText: "#12263A",

        pressOverlay: "rgba(0, 0, 0, 0.1)",

        alert: "#d63333",
        error: "#d63333",
        success: "#4ed633",
        warning: "#f5c61d",
    },
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
