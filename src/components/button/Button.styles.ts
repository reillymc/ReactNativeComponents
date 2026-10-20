import type { StyleFactory } from "../../style/styleFactory";
import type { InteractiveTextStyles } from "../text/InteractiveText.styles";
import {
    type ButtonBaseStyles,
    defaultButtonBaseStyles,
} from "./ButtonBase.styles";

export type ButtonVariant = "primary" | "secondary" | "destructive";

export type ButtonStyles = {
    container: {
        borderRadius: ButtonBaseStyles["borderRadius"];
        color: Record<ButtonVariant, ButtonBaseStyles["backgroundColor"]>;
    };
    label: {
        color: Record<ButtonVariant, InteractiveTextStyles["color"]>;
    };
};

export const defaultButtonStyles: StyleFactory<ButtonStyles> = (theme) => {
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
