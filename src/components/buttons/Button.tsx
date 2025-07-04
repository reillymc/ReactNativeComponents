import type { FC } from "react";
import { type ColorValue, type DimensionValue, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import {
    Action,
    type ActionProps,
    type ActionState,
    type ActionStyles,
    type ActionVariant,
} from "./Action";

export type ButtonSize = "regular" | "large";

type ButtonStyles = {
    height: { [Size in ButtonSize]: DimensionValue };
    width: { [Size in ButtonSize]: DimensionValue };
    padding: number;
    borderRadius: number;
    color: {
        [Variant in ActionVariant]: { [State in ActionState]: ColorValue };
    };
    label: ActionStyles["label"];
};

interface ButtonProps extends ActionProps {
    style?: DeepPartial<ButtonStyles>;
    size?: "large" | "regular";
}

const Button: FC<ButtonProps> = ({
    label,
    variant = "primary",
    size = "large",
    disabled: disabledProp,
    style,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const [styles, { button }] = useThemedStylesWithOverride(
        createStyles,
        { button: style },
        { size, variant, disabled },
    );

    return (
        <Action
            style={{ label: button.label }}
            onPress={onPress}
            disabled={disabled}
            label={label}
            variant={variant}
            containerStyle={({ pressed }) => [
                styles.button,
                pressed && { backgroundColor: button.color[variant].pressed },
            ]}
        />
    );
};

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonStyles };

const createStyles = (
    { styles: { button } }: ThemedStyles,
    {
        size = "large",
        variant,
        disabled,
    }: Required<Pick<ButtonProps, "size" | "variant" | "disabled">>,
) => {
    const styles = StyleSheet.create({
        button: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: button.borderRadius,
            minHeight: button.height[size],
            minWidth: button.width[size],
            backgroundColor:
                button.color[variant][disabled ? "disabled" : "default"],
            padding: button.padding,
        },
    });
    return styles;
};
