import type { ColorValue } from "react-native";

import type { SizeVariant } from "../../theme/size";
import type { ThemeFactory } from "../../theme/theme";

export type InputVariant = SizeVariant;

export type FieldTheme = {
    surface: {
        backgroundColor: ColorValue;
        borderColor: ColorValue;
        borderWidth: number;
        borderRadius: number;
        minHeight: Record<InputVariant, number>;
        padding: number;
        errorBorderColor: ColorValue;
    };
    text: {
        fontSize: number;
        fontFamily: string;
        color: ColorValue;
        placeholderColor: ColorValue;
    };
    icon: {
        color: ColorValue;
        size: number;
    };
    label: {
        gap: number;
    };
    row: {
        gap: number;
    };
    help: {
        gap: number;
        color: ColorValue;
        errorColor: ColorValue;
    };
    required: {
        color: ColorValue;
    };
};

export const defaultFieldTheme: ThemeFactory<"field"> = ({ palette }) => {
    const { border, color, font, spacing } = palette;

    return {
        surface: {
            backgroundColor: color.inset,
            borderColor: "transparent",
            borderWidth: border.width.thin,
            borderRadius: border.radius.regular,
            minHeight: {
                regular: 48,
                compact: 36,
            },
            padding: spacing.small,
            errorBorderColor: color.destructive,
        },
        text: {
            fontSize: font.size.regular,
            fontFamily: font.family.sans,
            color: color.insetForeground,
            placeholderColor: color.mutedForeground,
        },
        icon: {
            color: color.insetForeground,
            size: font.size.xLarge,
        },
        label: {
            gap: spacing.tiny,
        },
        row: {
            gap: 0,
        },
        help: {
            gap: spacing.tiny,
            color: color.mutedForeground,
            errorColor: color.destructive,
        },
        required: {
            color: color.primary,
        },
    };
};
