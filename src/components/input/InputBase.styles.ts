import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export type InputState = "enabled" | "disabled";
export type InputVariant = "regular" | "compact";

export interface InputBaseStyles {
    container: {
        height: Record<InputVariant, number>;
        padding: number;
        borderRadius: number;
        backgroundColor: Record<InputState, ColorValue>;
    };
    text: {
        fontSize: number;
        fontFamily: string;
        color: Record<InputState, ColorValue>;
        placeholderColor: ColorValue;
    };
}

export const defaultInputBaseStyles: StyleFactory<InputBaseStyles> = ({
    border,
    color,
    font,
    spacing,
}) => ({
    container: {
        height: {
            regular: 48,
            compact: 36,
        },
        borderRadius: border.radius.regular,
        padding: spacing.small,
        backgroundColor: {
            enabled: color.inputBackground,
            disabled: color.inputBackgroundDisabled,
        },
    },
    text: {
        fontSize: font.size.regular,
        fontFamily: font.family.sans,
        color: {
            enabled: color.textPrimary,
            disabled: color.textSecondary,
        },
        placeholderColor: color.textSecondary,
    },
});
