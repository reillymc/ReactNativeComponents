import type { ColorValue, DimensionValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export type ButtonState = "enabled" | "disabled" | "pressed";

export type ButtonBaseStyles = {
    height: DimensionValue;
    width: {
        medium: DimensionValue;
    };
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number | `${number}%`;
    backgroundColor: Record<ButtonState, ColorValue>;
};

export const defaultButtonBaseStyles: StyleFactory<ButtonBaseStyles> = ({
    border,
    color,
    spacing,
}) => ({
    height: 42,
    width: {
        medium: "50%",
    },
    borderRadius: border.radius.regular,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: {
        enabled: color.primary,
        pressed: color.primaryLight,
        disabled: color.primaryLight,
    },
});
