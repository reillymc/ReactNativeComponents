import { useContext } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import { MenuItem, type MenuItemTheme } from "../../overlays/menu";
import type { TextTheme } from "../../typography/text";
import {
    IconButtonBase,
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
        caption: TextTheme;
        button: IconButtonTheme;
    };
    menu: {
        item: Record<ContextActionVariant, MenuItemTheme>;
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

    const content =
        theme.swipe.button.appearance[resolvedAppearance].content[variant];
    const container =
        resolvedAppearance === "prominent"
            ? theme.swipe.button.appearance.prominent.container[variant]
            : theme.swipe.button.appearance.subtle.container;

    return (
        <IconButtonBase
            iconSet={iconSet}
            iconName={iconName}
            label={label}
            hitSlop={0}
            tabIndex={-1}
            onPress={handlePress}
            disabled={disabled}
            accessibilityLabel={accessibilityLabel ?? label}
            theme={{
                container: {
                    size: theme.swipe.width,
                    gap: theme.swipe.gap,
                    backgroundColor: container,
                    borderRadius: theme.swipe.borderRadius,
                },
                icon: { color: content },
                label: { ...theme.swipe.caption, color: content },
            }}
            style={styles.swipeAction}
        />
    );
};

const createStyles = defineStyles((theme: ContextActionTheme) => ({
    swipeAction: {
        width: theme.swipe.width,
        height: "100%",
    },
}));
