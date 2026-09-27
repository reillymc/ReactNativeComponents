import type { Theme } from "../../theme/theme";
import type { ButtonStyles } from "./Button";
import { defaultButtonBaseStyles } from "./ButtonBase.styles";

export const defaultButtonStyles = (theme: Theme): ButtonStyles => {
    const { color } = theme;
    const buttonBase = defaultButtonBaseStyles(theme);

    return {
        container: {
            borderRadius: buttonBase.borderRadius,
            color: {
                secondary: {
                    enabled: color.textOnPrimary,
                    disabled: color.textOnPrimary,
                    pressed: color.textOnPrimary,
                },
                primary: {
                    enabled: color.primary,
                    disabled: color.primaryLight,
                    pressed: color.primaryLight,
                },
                destructive: {
                    enabled: color.textOnDestructive,
                    disabled: color.textOnDestructive,
                    pressed: color.textOnDestructive,
                },
            },
        },
        label: {
            color: {
                secondary: {
                    enabled: color.primary,
                    disabled: color.primaryLight,
                    pressed: color.primaryLight,
                },
                primary: {
                    enabled: color.textOnPrimary,
                    disabled: color.textOnPrimary,
                    pressed: color.textOnPrimary,
                },
                destructive: {
                    enabled: color.destructive,
                    disabled: color.destructiveHighlight,
                    pressed: color.destructiveHighlight,
                },
            },
        },
    };
};
