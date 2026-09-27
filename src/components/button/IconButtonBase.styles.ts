import type { Theme } from "../../theme/theme";
import { defaultInteractiveIconStyles } from "../icon/InteractiveIcon.styles";
import type { IconButtonBaseStyles } from "./IconButtonBase";

export const defaultIconButtonBaseStyles = (
    theme: Theme,
): IconButtonBaseStyles => ({
    container: {
        padding: 4,
        size: 48,
        backgroundColor: {
            enabled: theme.color.inputBackground,
            disabled: theme.color.inputBackgroundDisabled,
            pressed: theme.color.inputBackground,
        },
        borderRadius: "50%",
    },
    icon: defaultInteractiveIconStyles(theme),
});
