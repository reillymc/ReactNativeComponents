import type { FC } from "react";
import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { Text } from "../text";
import {
    ButtonBase,
    type ButtonBaseProps,
    type ButtonBaseStyles,
} from "./ButtonBase";

export type ButtonSize = "medium" | "large";
export type ButtonVariant = "primary" | "destructive";
export type ButtonAppearance = "prominent" | "subtle";

export type ButtonAppearanceStyles = {
    prominent: {
        container: Record<ButtonVariant, ColorValue>;
        content: Record<ButtonVariant, ColorValue>;
    };
    subtle: {
        container: ColorValue;
        content: Record<ButtonVariant, ColorValue>;
    };
};

export type ButtonStyles = {
    container: {
        borderRadius: ButtonBaseStyles["borderRadius"];
    };
    appearance: ButtonAppearanceStyles;
};

export interface ButtonProps
    extends Pick<
        ButtonBaseProps,
        "onPress" | "disabled" | "width" | "containerStyle"
    > {
    variant?: ButtonVariant;
    appearance?: ButtonAppearance;
    label: string;
    style?: DeepPartial<ButtonStyles>;
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = "primary",
    appearance = "subtle",
    disabled: disabledProp,
    style,
    onPress,
    ...props
}) => {
    const disabled = disabledProp || !onPress;

    const { button } = useStyles({
        button: style,
    });

    const content = button.appearance[appearance].content[variant];
    const container =
        appearance === "prominent"
            ? button.appearance.prominent.container[variant]
            : button.appearance.subtle.container;

    return (
        <ButtonBase
            {...props}
            style={{
                borderRadius: button.container.borderRadius,
                backgroundColor: container,
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text numberOfLines={1} style={{ color: content }}>
                {label}
            </Text>
        </ButtonBase>
    );
};

Button.displayName = "Button";
