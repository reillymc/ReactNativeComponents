import { useContext } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import { MenuItem, type MenuItemTheme } from "../../overlays/menu";
import {
    IconButton,
    type IconButtonProps,
    type IconButtonTheme,
} from "../button";
import type { ButtonVariant } from "../button/Button";
import { ContextActionContext } from "./ContextActionContext";

export type ContextActionVariant = ButtonVariant;

export type ContextActionTheme = {
    swipe: {
        width: number;
        borderRadius: number;
        gap: number;
        button: IconButtonTheme;
    };
    menu: {
        item: Record<ContextActionVariant, DeepPartial<MenuItemTheme>>;
    };
};

export interface ContextActionProps
    extends Pick<
        IconButtonProps,
        "onPress" | "variant" | "appearance" | "disabled" | "accessibilityLabel"
    > {
    /** Required human-readable label. Also used as the default a11y label. */
    label: string;
    theme?: DeepPartial<ContextActionTheme>;
}

export const ContextAction = <G extends string>({
    label,
    theme: themeOverrides,
    variant = "primary",
    appearance,
    onPress,
    disabled,
    accessibilityLabel,
    iconSet,
    iconName,
}: ContextActionProps & IconComponentProps<G>) => {
    const context = useContext(ContextActionContext);
    const { styles, theme } = useComponent("contextAction", {
        themeOverrides,
        createStyles,
    });

    const resolvedAppearance =
        appearance ?? (variant === "destructive" ? "prominent" : "subtle");

    const handlePress = () => {
        onPress?.();
        context.onActionActivated?.();
    };

    if (context.layout === "menu") {
        return (
            <MenuItem
                label={label}
                iconSet={iconSet}
                iconName={iconName}
                disabled={disabled}
                highlighted={context.active}
                role="menuitem"
                tabIndex={-1}
                onPress={handlePress}
                accessibilityLabel={accessibilityLabel ?? label}
                theme={theme.menu.item[variant]}
            />
        );
    }

    return (
        <IconButton
            iconSet={iconSet}
            iconName={iconName}
            label={label}
            hitSlop={0}
            tabIndex={-1}
            onPress={handlePress}
            disabled={disabled}
            accessibilityLabel={accessibilityLabel ?? label}
            variant={variant}
            appearance={resolvedAppearance}
            theme={theme.swipe.button}
            style={styles.swipeAction}
        />
    );
};

const createStyles = defineStyles((theme: ContextActionTheme) => ({
    swipeAction: {
        width: theme.swipe.width,
        height: "100%",
        gap: theme.swipe.gap,
        borderRadius: theme.swipe.borderRadius,
    },
}));
