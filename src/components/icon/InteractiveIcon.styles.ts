import type { StyleFactory } from "../../style/styleFactory";
import { defaultIconBaseStyles, type IconBaseStyles } from "./IconBase.styles";

export type InteractiveIconState = "enabled" | "disabled" | "pressed";

export type InteractiveIconStyles = {
    size: IconBaseStyles["size"];
    color: {
        [State in InteractiveIconState]: IconBaseStyles["color"];
    };
};

export const defaultInteractiveIconStyles: StyleFactory<
    InteractiveIconStyles
> = (theme) => {
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
