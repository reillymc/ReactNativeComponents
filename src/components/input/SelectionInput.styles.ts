import type { Theme } from "../../theme/theme";
import { defaultInputActionStyles } from "./InputAction.styles";
import { defaultInputBaseStyles } from "./InputBase.styles";
import type { SelectionInputStyles } from "./SelectionInput";

export const defaultSelectionInputStyles = (
    theme: Theme,
): SelectionInputStyles => {
    const { color, spacing } = theme;
    const inputBase = defaultInputBaseStyles(theme);
    const inputAction = defaultInputActionStyles(theme);

    return {
        container: {
            backgroundColor: {
                ...inputBase.container.backgroundColor,
                pressed: color.backgroundHighlight,
            },
        },
        selectionContainer: {
            gap: spacing.tiny,
        },
        icon: inputAction.icon,
    };
};
