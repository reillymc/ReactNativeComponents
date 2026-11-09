import type { StyleFactory } from "../../style/styleFactory";
import type { InteractiveIconStyles } from "../icon/InteractiveIcon.styles";
import {
    defaultInteractiveTextStyles,
    type InteractiveTextStyles,
} from "../text/InteractiveText.styles";

export type IconActionBaseStyles = {
    gap: number;
    text: {
        color: InteractiveTextStyles["color"];
    };
    icon: {
        color: InteractiveIconStyles["color"];
    };
};

export const defaultIconActionBaseStyles: StyleFactory<IconActionBaseStyles> = (
    theme,
) => {
    const interactiveText = defaultInteractiveTextStyles(theme);

    return {
        gap: theme.spacing.small,
        icon: interactiveText,
        text: interactiveText,
    };
};
