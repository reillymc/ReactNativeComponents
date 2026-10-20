import type { StyleFactory } from "../../style/styleFactory";
import { defaultActionStyles } from "../action/Action.styles";
import { defaultIconStyles } from "../icon/Icon.styles";
import type { InteractiveIconStyles } from "../icon/InteractiveIcon.styles";
import type { InputVariant } from "./InputBase.styles";

export type ToggleVariant = "primary" | "secondary";

export type ToggleInputStyles = {
    indicator: {
        size: { [Size in InputVariant]: number };
        color: {
            deselected: InteractiveIconStyles["color"];
            selected: Record<ToggleVariant, InteractiveIconStyles["color"]>;
        };
    };
    label: {
        gap: number;
    };
};

export const defaultToggleInputStyles: StyleFactory<ToggleInputStyles> = (
    theme,
) => {
    const { color, spacing } = theme;
    const icon = defaultIconStyles(theme);
    const action = defaultActionStyles(theme);

    return {
        indicator: {
            size: {
                compact: icon.size.small,
                regular: icon.size.medium,
            },
            color: {
                selected: action.label.color,
                deselected: {
                    enabled: color.border,
                    disabled: color.border,
                    pressed: color.border,
                },
            },
        },
        label: {
            gap: spacing.small,
        },
    };
};
