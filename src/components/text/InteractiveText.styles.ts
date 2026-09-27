import type { Theme } from "../../theme/theme";
import type { InteractiveTextStyles } from "./InteractiveText";

export const defaultInteractiveTextStyles = ({
    color,
}: Theme): InteractiveTextStyles => ({
    color: {
        enabled: color.primary,
        pressed: color.primaryLight,
        disabled: color.primaryLight,
    },
});
