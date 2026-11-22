import { useContext } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import {
    IconButton,
    type IconButtonProps,
    type IconButtonTheme,
} from "../button";
import { SwipeActionContext } from "./SwipeActionContext";

export interface SwipeActionTheme {
    width: number;
    borderRadius: number;
    gap: number;
    button: IconButtonTheme;
}

export interface SwipeActionProps
    extends Pick<
        IconButtonProps,
        "onPress" | "variant" | "appearance" | "disabled" | "accessibilityLabel"
    > {
    label: string;
    theme?: DeepPartial<SwipeActionTheme>;
}

export const SwipeAction = <G extends string>({
    label,
    theme: themeOverrides,
    variant = "primary",
    appearance,
    onPress,
    disabled,
    accessibilityLabel,
    iconSet,
    iconName,
}: SwipeActionProps & IconComponentProps<G>) => {
    const context = useContext(SwipeActionContext);
    const { styles, theme } = useComponent("swipeAction", {
        themeOverrides,
        createStyles,
    });

    return (
        <IconButton
            iconSet={iconSet}
            iconName={iconName}
            label={label}
            hitSlop={0}
            tabIndex={-1}
            onPress={() => {
                onPress?.();
                context.onActionActivated?.();
            }}
            disabled={disabled}
            accessibilityLabel={accessibilityLabel ?? label}
            variant={variant}
            appearance={
                appearance ??
                (variant === "destructive" ? "prominent" : "subtle")
            }
            theme={theme.button}
            style={styles.action}
        />
    );
};

const createStyles = defineStyles((theme: SwipeActionTheme) => ({
    action: {
        width: theme.width,
        height: "100%",
        gap: theme.gap,
        borderRadius: theme.borderRadius,
    },
}));
