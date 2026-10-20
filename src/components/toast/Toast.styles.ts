import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export interface ToastStyles {
    container: {
        backgroundColor: ColorValue;
        padding: number;
        borderRadius: number;
    };
}

export const defaultToastStyles: StyleFactory<ToastStyles> = ({
    color,
    spacing,
    border,
}) => ({
    container: {
        backgroundColor: color.backgroundHighlight,
        padding: spacing.medium,
        borderRadius: border.radius.loose,
    },
});
