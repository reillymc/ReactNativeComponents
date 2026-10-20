import type { StyleFactory } from "../../style/styleFactory";
import { defaultIconBaseStyles, type IconBaseStyles } from "./IconBase.styles";

export type IconSize = "small" | "medium" | "large";

export interface IconStyles {
    color: IconBaseStyles["color"];
    size: Record<IconSize, IconBaseStyles["size"]>;
}

export const defaultIconStyles: StyleFactory<IconStyles> = (theme) => {
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
