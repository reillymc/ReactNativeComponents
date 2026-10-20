import type { StyleFactory } from "../../style/styleFactory";
import type { InteractiveIconStyles } from "../icon/InteractiveIcon.styles";
import type { InteractiveTextStyles } from "../text/InteractiveText.styles";
import { defaultActionStyles } from "./Action.styles";

export type IconActionVariant = "primary" | "secondary" | "destructive";

export type IconActionStyles = {
    text: {
        color: {
            [Variant in IconActionVariant]: InteractiveTextStyles["color"];
        };
    };
    icon: {
        color: {
            [Variant in IconActionVariant]: InteractiveIconStyles["color"];
        };
    };
};

export const defaultIconActionStyles: StyleFactory<IconActionStyles> = (
    theme,
) => {
    const action = defaultActionStyles(theme);

    return {
        icon: action.label,
        text: action.label,
    };
};
