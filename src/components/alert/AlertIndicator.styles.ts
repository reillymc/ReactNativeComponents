import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export type AlertVariant = "primary" | "secondary";

export type AlertIndicatorStyles = {
    size: number;
    borderRadius: number;
    color: Record<AlertVariant, ColorValue>;
    backgroundColor: Record<AlertVariant, ColorValue>;
};

export const defaultAlertIndicatorStyles: StyleFactory<
    AlertIndicatorStyles
> = ({ color }) => ({
    size: 28,
    borderRadius: 14,
    backgroundColor: {
        primary: color.primary,
        secondary: color.secondary,
    },
    color: {
        primary: color.textOnPrimary,
        secondary: color.textOnSecondary,
    },
});
