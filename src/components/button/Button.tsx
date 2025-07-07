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
        height: Record<ButtonSize, ButtonBaseStyles["height"]>;
        width: Record<ButtonSize, ButtonBaseStyles["width"]>;
        borderRadius: ButtonBaseStyles["borderRadius"];
        color: Record<ButtonVariant, ButtonBaseStyles["backgroundColor"]>;
    };
    label: {
        color: Record<ButtonVariant, InteractiveTextStyles["color"]>;
    };
};

export interface ButtonProps
    extends Pick<ButtonBaseProps, "onPress" | "disabled" | "containerStyle"> {
    size?: ButtonSize;
    variant?: ButtonVariant;
    label: string;
    style?: DeepPartial<ButtonStyles>;
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = "secondary",
    size = "large",
    disabled: disabledProp,
    style,
    containerStyle,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const { button } = useStylesWithOverride({
        button: style,
    });

    return (
        <ButtonBase
            style={{
                borderRadius: button.container.borderRadius,
                backgroundColor: button.container.color[variant],
                height: button.container.height[size],
                width: button.container.width[size],
            }}
            onPress={onPress}
            disabled={disabled}
            containerStyle={containerStyle}
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
