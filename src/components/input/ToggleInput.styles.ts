import type { Theme } from "../../theme/theme";
import { defaultActionStyles } from "../action/Action.styles";
import { defaultIconStyles } from "../icon/Icon.styles";
import type { ToggleInputStyles } from "./ToggleInput";

export const defaultToggleInputStyles = (theme: Theme): ToggleInputStyles => {
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
                    disabled: color.muted,
                },
            },
        },
        label: {
            gap: spacing.small,
        },
    };
};
