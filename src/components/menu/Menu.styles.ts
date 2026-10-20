import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";
import { defaultInputBaseStyles } from "../input/InputBase.styles";

export type MenuStyles = {
    parentMargin: number;
    backgroundColor: ColorValue;
    borderRadius: number;
    padding: number;
    gap: number;
    maxHeight: number;
};

export const defaultMenuStyles: StyleFactory<MenuStyles> = (theme) => {
    const inputBase = defaultInputBaseStyles(theme);

    return {
        backgroundColor: theme.color.inputBackground,
        borderRadius: inputBase.container.borderRadius,
        gap: theme.spacing.tiny,
        padding: theme.spacing.tiny,
        parentMargin: theme.spacing.medium,
        maxHeight: 240,
    };
};
