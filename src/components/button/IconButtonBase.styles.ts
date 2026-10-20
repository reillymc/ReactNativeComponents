import type { DimensionValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";
import {
    defaultInteractiveIconStyles,
    type InteractiveIconStyles,
} from "../icon/InteractiveIcon.styles";
import type { ButtonBaseStyles } from "./ButtonBase.styles";

export type IconButtonBaseStyles = {
    container: {
        size: DimensionValue;
        padding: number;
        borderRadius: ButtonBaseStyles["borderRadius"];
        backgroundColor: ButtonBaseStyles["backgroundColor"];
    };
    icon: InteractiveIconStyles;
};

export const defaultIconButtonBaseStyles: StyleFactory<IconButtonBaseStyles> = (
    theme,
) => ({
    container: {
        padding: 4,
        size: 48,
        backgroundColor: {
            enabled: theme.color.inputBackground,
            disabled: theme.color.inputBackgroundDisabled,
            pressed: theme.color.inputBackground,
        },
        borderRadius: "50%",
    },
    icon: defaultInteractiveIconStyles(theme),
});
