import type { Theme } from "../../theme/theme";
import { defaultActionStyles } from "../action/Action.styles";
import { defaultIconStyles } from "../icon/Icon.styles";
import type { IconButtonStyles } from "./IconButton";

export const defaultIconButtonStyles = (theme: Theme): IconButtonStyles => {
    const { color, spacing } = theme;
    const icon = defaultIconStyles(theme);
    const action = defaultActionStyles(theme);

    return {
        container: {
            size: icon.size.medium + spacing.small,
            backgroundColor: {
                primary: {
                    enabled: color.background,
                    disabled: color.backgroundHighlight,
                    pressed: color.backgroundHighlight,
                },
                secondary: {
                    enabled: color.background,
                    disabled: color.backgroundHighlight,
                    pressed: color.backgroundHighlight,
                },
                destructive: {
                    enabled: color.destructive,
                    disabled: color.destructiveHighlight,
                    pressed: color.destructiveHighlight,
                },
            },
        },
        icon: {
            color: {
                ...action.label.color,
                destructive: {
                    enabled: color.textOnDestructive,
                    pressed: color.textOnDestructive,
                    disabled: color.textOnDestructive,
                },
            },
        },
    };
};
