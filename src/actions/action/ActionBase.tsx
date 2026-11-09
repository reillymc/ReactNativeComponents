import type { FC, ReactNode } from "react";
import {
    Platform,
    type PressableProps,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent, useFocusVisible } from "../../internal";
import { useSystems } from "../../theme";
import { PressableBase } from "./PressableBase";

export type ActionState = {
    pressed: boolean;
    hovered?: boolean;
};

export type ActionBaseTheme = {
    borderRadius: number;
};

export interface ActionBaseProps
    extends Pick<
        PressableProps,
        | "hitSlop"
        | "tabIndex"
        | "onFocus"
        | "onBlur"
        | "accessibilityLabel"
        | "role"
        | "accessibilityRole"
        | "accessibilityState"
        | "accessibilityValue"
        | "aria-checked"
        | "onPress"
    > {
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    highlighted?: boolean;
    theme?: DeepPartial<ActionBaseTheme>;
    children?: ReactNode | ((state: ActionState) => ReactNode);
    /**
     * Link target. When set, the surface defaults to the `link` role and web
     * renders it as an anchor.
     */
    href?: string;
    /**
     * Web-only attributes for `href`.
     */
    hrefAttrs?: {
        download?: string;
        rel?: string;
        target?: string;
    };
    /**
     * Shorthand web-only link attributes, forwarded as `hrefAttrs`.
     */
    rel?: string;
    target?: string;
    download?: string;
}

export const ActionBase: FC<ActionBaseProps> = ({
    disabled,
    highlighted,
    style,
    hitSlop: hitSlopOverride,
    onFocus,
    onBlur,
    theme: themeOverrides,
    children,
    href,
    hrefAttrs,
    rel,
    target,
    download,
    role,
    accessibilityRole,
    onPress,
    ...pressableProps
}) => {
    const focus = useFocusVisible();
    const { styles } = useComponent("actionBase", {
        themeOverrides,
        createStyles,
    });
    const { getFocusRingStyle, getDisabledStyle, hitSlop } = useSystems();
    const resolvedHitSlop = hitSlopOverride ?? hitSlop.default;
    let defaultRole: "button" | "link" | undefined;
    if (href != null) {
        defaultRole = "link";
    } else if (onPress) {
        defaultRole = "button";
    }
    const resolvedRole =
        role ?? (accessibilityRole == null ? defaultRole : undefined);
    const linkProps =
        href == null
            ? {}
            : {
                  href,
                  ...(Platform.OS === "web"
                      ? {
                            hrefAttrs:
                                hrefAttrs == null &&
                                rel == null &&
                                target == null &&
                                download == null
                                    ? undefined
                                    : {
                                          rel,
                                          target,
                                          download,
                                          ...hrefAttrs,
                                      },
                        }
                      : {}),
              };
    const renderChildren = (state: ActionState) =>
        typeof children === "function" ? children(state) : children;

    if (!onPress) {
        return (
            <View
                {...pressableProps}
                {...linkProps}
                role={resolvedRole}
                accessibilityRole={accessibilityRole}
                style={[getDisabledStyle(!!disabled), styles.pressable, style]}
            >
                {renderChildren({ pressed: false, hovered: false })}
            </View>
        );
    }

    return (
        <PressableBase
            {...pressableProps}
            {...linkProps}
            role={resolvedRole}
            accessibilityRole={accessibilityRole}
            hitSlop={resolvedHitSlop}
            disabled={disabled}
            onBlur={(event) => {
                focus.onBlur();
                onBlur?.(event);
            }}
            onFocus={(event) => {
                focus.onFocus();
                onFocus?.(event);
            }}
            onPointerCancel={focus.onPointerCancel}
            onPointerDown={focus.onPointerDown}
            onPointerUp={focus.onPointerUp}
            onPress={onPress}
            style={[
                getFocusRingStyle(!disabled && focus.focusVisible),
                getDisabledStyle(!!disabled),
                styles.pressable,
                style,
            ]}
        >
            {(state) =>
                typeof children === "function"
                    ? children({
                          ...state,
                          hovered: !disabled && (state.hovered || highlighted),
                      })
                    : children
            }
        </PressableBase>
    );
};

const createStyles = defineStyles((theme: ActionBaseTheme) => ({
    pressable: {
        borderRadius: theme.borderRadius,
        overflow: "hidden",
    },
}));
