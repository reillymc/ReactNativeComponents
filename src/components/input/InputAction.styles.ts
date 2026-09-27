import type { Theme } from "../../theme/theme";
import { defaultActionStyles } from "../action/Action.styles";
import type { InputActionStyles } from "./InputAction";

export const defaultInputActionStyles = (theme: Theme): InputActionStyles => {
    const action = defaultActionStyles(theme);

    return {
        icon: {
            color: action.label.color.secondary,
        },
    };
};
