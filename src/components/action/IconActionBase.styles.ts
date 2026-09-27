import type { Theme } from "../../theme/theme";
import { defaultInteractiveTextStyles } from "../text/InteractiveText.styles";
import type { IconActionBaseStyles } from "./IconActionBase";

export const defaultIconActionBaseStyles = (
    theme: Theme,
): IconActionBaseStyles => {
    const interactiveText = defaultInteractiveTextStyles(theme);

    return {
        gap: theme.spacing.small,
        icon: interactiveText,
        text: interactiveText,
    };
};
