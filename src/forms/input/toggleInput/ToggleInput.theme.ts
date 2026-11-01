import type { ColorValue } from "react-native";

import type { ThemeFactory } from "../../../theme/theme";
import type { InputVariant } from "../../field";

export type ToggleAppearance = "primary" | "secondary";

export type ToggleInputTheme = {
    indicator: {
        surfaceSize: Record<InputVariant, number>;
        iconSize: Record<InputVariant, number>;
        color: {
            selected: Record<ToggleAppearance, ColorValue>;
            deselected: ColorValue;
            icon: Record<ToggleAppearance, ColorValue>;
        };
    };
    label: {
        gap: number;
    };
};

export const defaultToggleInputTheme: ThemeFactory<"toggleInput"> = ({
    palette,
}) => {
    const { color, spacing } = palette;

    return {
        indicator: {
            surfaceSize: {
                compact: palette.font.size.large,
                regular: palette.font.size.xLarge,
            },
            iconSize: {
                compact: palette.font.size.large - palette.spacing.tiny,
                regular: palette.font.size.xLarge - palette.spacing.tiny,
            },
            color: {
                selected: {
                    primary: color.primary,
                    secondary: color.secondary,
                },
                deselected: color.border,
                icon: {
                    primary: color.primaryForeground,
                    secondary: color.secondaryForeground,
                },
            },
        },
        label: {
            gap: spacing.small,
        },
    };
};
