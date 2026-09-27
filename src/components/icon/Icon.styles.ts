import type { Theme } from "../../theme/theme";
import type { IconStyles } from "./Icon";
import { defaultIconBaseStyles } from "./IconBase.styles";

export const defaultIconStyles = (theme: Theme): IconStyles => {
    const iconBase = defaultIconBaseStyles(theme);

    return {
        color: theme.color.textPrimary,
        size: {
            small: 16,
            medium: iconBase.size,
            large: 24,
        },
    };
};
