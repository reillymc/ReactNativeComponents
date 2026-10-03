import type { Theme } from "../../theme/theme";
import type { ButtonStyles } from "./Button";
import { defaultButtonBaseStyles } from "./ButtonBase.styles";

export const defaultButtonStyles = (theme: Theme): ButtonStyles => {
    const { color } = theme;
    const buttonBase = defaultButtonBaseStyles(theme);

    return {
        container: {
            borderRadius: buttonBase.borderRadius,
        },
        appearance: {
            prominent: {
                container: {
                    primary: color.primary,
                    destructive: color.destructive,
                },
                content: {
                    primary: color.primaryForeground,
                    destructive: color.destructiveForeground,
                },
            },
            subtle: {
                container: color.inset,
                content: {
                    primary: color.primary,
                    destructive: color.destructive,
                },
            },
        },
    };
};
