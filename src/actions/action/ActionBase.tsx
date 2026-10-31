import type { FC, ReactNode } from "react";
import {
    type PressableProps,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent, useFocusVisible } from "../../internal";
import { useSystems } from "../../theme/useSystems";
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
    const renderChildren = (state: ActionState) =>
        typeof children === "function" ? children(state) : children;

    if (!onPress) {
        return (
            <View
                {...pressableProps}
                style={[getDisabledStyle(!!disabled), styles.pressable, style]}
            >
                {renderChildren({ pressed: false, hovered: false })}
            </View>
        );
    }

    return (
        <PressableBase
            {...pressableProps}
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
