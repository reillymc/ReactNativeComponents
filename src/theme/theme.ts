import { DeepPartial } from "../helpers";

export type Theme = typeof DefaultTheme;

export type ThemeOverrides = DeepPartial<Theme>;

export const DefaultTheme = {
    font: {
        familyWeight: {
            light100: "Helvetica-Light",
            light200: "Helvetica-Light",
            regular400: "Helvetica",
            bold600: "Helvetica-Bold",
            bold800: "Helvetica-Bold",
        },
        size: {
            tiny: 12,
            small: 14,
            regular: 16,
            emphasised: 18,
            large: 20,
            xLarge: 24,
            xxLarge: 32,
        },
    },
    color: {
        // Palette
        primary: "#FF4242",
        primaryHighlight: "#ff8585",
        primaryDisabled: "#ffbdbd",
        secondary: "#12263A",
        secondaryHighlight: "#22476D",
        secondaryDisabled: "#B5EAD7",
        tertiary: "#06bcc1",

        destructive: "#ff382e",
        destructiveHighlight: "#ff5c54",
        destructiveDisabled: "#ff9e96",

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

        textOnPrimary: "#12263A",
        textOnSecondary: "#F4EDEA",

        background: "#F4EDEA",
        backgroundHighlight: "#f7f3f2",
        foreground: "#ffffff",
        foregroundHighlight: "#B5EAD7",
        backgroundOverlay: "#000",
        shadow: "#555",

        border: "#E2E8F0",

        inputBackground: "#e4d8d4",
        inputBackgroundDisabled: "#E2E8F0",
        inputText: "#12263A",

        pressOverlay: "rgba(0, 0, 0, 0.1)",
    },
    padding: {
        pageHorizontal: 16,
        pageTop: 16,

        large: 24,
        regular: 16,
        small: 8,
        tiny: 4,
    },
    border: {
        radius: {
            tight: 4,
            regular: 8,
            loose: 16,
        },
    },
};

export const MergeTheme = (first: ThemeOverrides, second: ThemeOverrides | undefined): Theme => ({
    ...DefaultTheme,
    ...first,
    ...second,
    color: {
        ...DefaultTheme.color,
        ...first.color,
        ...second?.color,
    },
    font: {
        ...DefaultTheme.font,
        ...first.font,
        ...second?.font,
        familyWeight: {
            ...DefaultTheme.font.familyWeight,
            ...first.font?.familyWeight,
            ...second?.font?.familyWeight,
        },
        size: {
            ...DefaultTheme.font.size,
            ...first.font?.size,
            ...second?.font?.size,
        },
    },
    padding: {
        ...DefaultTheme.padding,
        ...first.padding,
        ...second?.padding,
    },
    border: {
        ...DefaultTheme.border,
        ...first.border,
        ...second?.border,
        radius: {
            ...DefaultTheme.border.radius,
            ...first.border?.radius,
            ...second?.border?.radius,
        },
    },
});
