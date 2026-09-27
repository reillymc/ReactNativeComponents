import type { Theme } from "../../theme/theme";
import { defaultIconBaseStyles } from "./IconBase.styles";
import type { InteractiveIconStyles } from "./InteractiveIcon";

export const defaultInteractiveIconStyles = (
    theme: Theme,
): InteractiveIconStyles => {
    const iconBase = defaultIconBaseStyles(theme);

    return {
        size: iconBase.size,
        color: {
            enabled: theme.color.primary,
            pressed: theme.color.primaryLight,
            disabled: theme.color.primaryLight,
        },
    };
};
