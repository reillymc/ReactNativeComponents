import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";
import type { InteractiveIconStyles } from "../icon/InteractiveIcon.styles";
import { defaultInputActionStyles } from "./InputAction.styles";
import { defaultInputBaseStyles } from "./InputBase.styles";

export type SelectionInputState = "enabled" | "disabled" | "pressed";

export type SelectionInputStyles = {
    container: {
        backgroundColor: Record<SelectionInputState, ColorValue>;
    };
    selectionContainer: {
        gap: number;
    };
    icon: Pick<InteractiveIconStyles, "color">;
};

export const defaultSelectionInputStyles: StyleFactory<SelectionInputStyles> = (
    theme,
) => {
    const { color, spacing } = theme;
    const inputBase = defaultInputBaseStyles(theme);
    const inputAction = defaultInputActionStyles(theme);

    return {
        container: {
            backgroundColor: {
                ...inputBase.container.backgroundColor,
                pressed: color.backgroundHighlight,
            },
        },
        selectionContainer: {
            gap: spacing.tiny,
        },
        icon: inputAction.icon,
    };
};
