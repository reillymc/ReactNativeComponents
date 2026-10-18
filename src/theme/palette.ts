import type { ColorValue } from "react-native";

export type ThemeColors = {
    background: ColorValue;
    foreground: ColorValue;

    inset: ColorValue;
    insetForeground: ColorValue;

    surface: ColorValue;
    surfaceForeground: ColorValue;

    elevated: ColorValue;
    elevatedForeground: ColorValue;

    primary: ColorValue;
    primaryForeground: ColorValue;
    secondary: ColorValue;
    secondaryForeground: ColorValue;
    destructive: ColorValue;
    destructiveForeground: ColorValue;

    muted: ColorValue;
    mutedForeground: ColorValue;

    border: ColorValue;

    tint1: ColorValue;
    tint2: ColorValue;
    tint3: ColorValue;
    tint4: ColorValue;
    tint5: ColorValue;
};

export const lightPalette: ThemeColors = {
    background: "#F4EDEA",
    foreground: "#12263A",

    inset: "#e4d8d4",
    insetForeground: "#12263A",

    surface: "#ffffff",
    surfaceForeground: "#12263A",

    elevated: "#ffffff",
    elevatedForeground: "#12263A",

    primary: "#FF4242",
    primaryForeground: "#F4EDEA",
    secondary: "#e4d8d4",
    secondaryForeground: "#12263A",
    destructive: "#ff382e",
    destructiveForeground: "#F4EDEA",

    muted: "#f7f3f2",
    mutedForeground: "#718191",

    border: "#E2E8F0",

    tint1: "#FF9AA2",
    tint2: "#FFDAC1",
    tint3: "#E2F0CB",
    tint4: "#B5EAD7",
    tint5: "#C7CEEA",
};

export const darkPalette: ThemeColors = {
    background: "#09090b",
    foreground: "#fafafa",

    inset: "#27272a",
    insetForeground: "#fafafa",

    surface: "#18181b",
    surfaceForeground: "#fafafa",

    elevated: "#37373a",
    elevatedForeground: "#fafafa",

    primary: "#FF4242",
    primaryForeground: "#fafafa",
    secondary: "#27272a",
    secondaryForeground: "#fafafa",
    destructive: "#ff5c54",
    destructiveForeground: "#fafafa",

    muted: "#27272a",
    mutedForeground: "#a1a1aa",

    border: "#27272a",

    tint1: "#7a3b40",
    tint2: "#7a5a3b",
    tint3: "#4f5f3b",
    tint4: "#3b5f55",
    tint5: "#45456b",
};
