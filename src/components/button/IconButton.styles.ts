import type { StyleFactory } from "../../style/styleFactory";
import { defaultActionStyles } from "../action/Action.styles";
import { defaultIconStyles } from "../icon/Icon.styles";
import type { InteractiveIconStyles } from "../icon/InteractiveIcon.styles";
import type { IconButtonBaseStyles } from "./IconButtonBase.styles";

export type IconButtonVariant = "primary" | "secondary" | "destructive";

export type IconButtonStyles = {
    container: {
        size: number;
        backgroundColor: Record<
            IconButtonVariant,
            IconButtonBaseStyles["container"]["backgroundColor"]
        >;
    };
    icon: {
        color: Record<IconButtonVariant, InteractiveIconStyles["color"]>;
    };
};

export const defaultIconButtonStyles: StyleFactory<IconButtonStyles> = (
    theme,
) => {
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
