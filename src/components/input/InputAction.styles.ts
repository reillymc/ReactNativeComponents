import type { StyleFactory } from "../../style/styleFactory";
import { defaultActionStyles } from "../action/Action.styles";
import type { IconActionBaseStyles } from "../action/IconActionBase.styles";

export interface InputActionStyles {
    icon: Pick<IconActionBaseStyles["icon"], "color">;
}

export const defaultInputActionStyles: StyleFactory<InputActionStyles> = (
    theme,
) => {
    const action = defaultActionStyles(theme);

    return {
        icon: {
            color: action.label.color.secondary,
        },
    };
};
