import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export interface IconBaseStyles {
    color: ColorValue;
    size: number;
}

export const defaultIconBaseStyles: StyleFactory<IconBaseStyles> = ({
    color,
}) => ({
    color: color.textPrimary,
    size: 20,
});
