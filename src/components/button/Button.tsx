import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import { InteractiveText, type InteractiveTextStyles } from "../text";
import {
    ButtonBase,
    type ButtonBaseProps,
    type ButtonBaseStyles,
} from "./ButtonBase";

export type ButtonSize = "medium" | "large";
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

export interface ButtonProps
    extends Pick<
        ButtonBaseProps,
        "onPress" | "disabled" | "width" | "containerStyle"
    > {
    variant?: ButtonVariant;
    label: string;
    style?: DeepPartial<ButtonStyles>;
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = "secondary",
    disabled: disabledProp,
    style,
    onPress,
    ...props
}) => {
    const disabled = disabledProp || !onPress;

    const { button } = useStylesWithOverride({
        button: style,
    });

    return (
        <ButtonBase
            {...props}
            style={{
                borderRadius: button.container.borderRadius,
                backgroundColor: button.container.color[variant],
            }}
            onPress={onPress}
            disabled={disabled}
        >
            {(pressableState) => (
                <InteractiveText
                    {...pressableState}
                    disabled={disabled}
                    style={{ color: button.label.color[variant] }}
                >
                    {label}
                </InteractiveText>
            )}
        </ButtonBase>
    );
};

Button.displayName = "Button";
