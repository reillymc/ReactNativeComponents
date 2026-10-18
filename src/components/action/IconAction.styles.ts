import type { Theme } from "../../theme/theme";
import { defaultActionStyles } from "./Action.styles";
import type { IconActionStyles } from "./IconAction";

export const defaultIconActionStyles = (theme: Theme): IconActionStyles => {
    const action = defaultActionStyles(theme);

    return {
        color: action.label.color,
    };
};
