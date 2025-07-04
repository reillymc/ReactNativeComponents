import type { FC } from "react";
import { type ColorValue, type DimensionValue, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import type { ActionState, ActionVariant } from "./Action";
import { ActionBase, type ActionBaseProps } from "./ActionBase";

export type ButtonSize = "regular" | "large";
export type ButtonVariant = "primary" | "secondary" | "destructive";

export type ButtonBaseStyles = {
    height: { [Size in ButtonSize]: DimensionValue };
    width: { [Size in ButtonSize]: DimensionValue };
    padding: number;
    borderRadius: number | `${number}%`;
    color: {
        [Variant in ActionVariant]: { [State in ActionState]: ColorValue };
    };
};

export interface ButtonBaseProps
    extends Pick<
        ActionBaseProps,
        "children" | "disabled" | "onPress" | "containerStyle"
    > {
    size?: ButtonSize;
    variant?: ButtonVariant;
    style?: DeepPartial<ButtonBaseStyles>;
}

export const ButtonBase: FC<ButtonBaseProps> = ({
    variant = "secondary",
    containerStyle,
    size = "regular",
    disabled: disabledProp,
    style,
    children,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const [styles, { buttonBase }] = useThemedStylesWithOverride(
        createStyles,
        { buttonBase: style },
        { variant, disabled, size },
    );

    return (
        <ActionBase
            onPress={onPress}
            disabled={disabled}
            containerStyle={(pressableState) => [
                styles.button,
                pressableState.pressed && {
                    backgroundColor: buttonBase.color[variant].pressed,
                },
                typeof containerStyle === "function"
                    ? containerStyle(pressableState)
                    : containerStyle,
            ]}
        >
            {children}
        </ActionBase>
    );
};

const createStyles = (
    { styles: { buttonBase } }: ThemedStyles,
    {
        size = "large",
        variant,
        disabled,
    }: Required<Pick<ButtonBaseProps, "size" | "variant" | "disabled">>,
) => {
    const styles = StyleSheet.create({
        button: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: buttonBase.borderRadius,
            minHeight: buttonBase.height[size],
            minWidth: buttonBase.width[size],
            backgroundColor:
                buttonBase.color[variant][disabled ? "disabled" : "default"],
            padding: buttonBase.padding,
        },
    });
    return styles;
};
