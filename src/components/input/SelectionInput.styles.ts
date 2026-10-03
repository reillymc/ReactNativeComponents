import type { Theme } from "../../theme/theme";
import { defaultInputActionStyles } from "./InputAction.styles";
import { defaultInputBaseStyles } from "./InputBase.styles";
import type { SelectionInputStyles } from "./SelectionInput";

export const defaultSelectionInputStyles = (
    theme: Theme,
): SelectionInputStyles => {
    const { spacing } = theme;
    const inputBase = defaultInputBaseStyles(theme);
    const inputAction = defaultInputActionStyles(theme);

    return {
        container: {
            backgroundColor: inputBase.container.backgroundColor,
        },
        selectionContainer: {
            gap: spacing.tiny,
        },
        icon: { color: inputAction.color },
    };
};
