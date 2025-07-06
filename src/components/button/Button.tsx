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
        height: { [Size in ButtonSize]: ButtonBaseStyles["height"] };
        width: { [Size in ButtonSize]: ButtonBaseStyles["width"] };
        borderRadius: ButtonBaseStyles["borderRadius"];
        color: {
            [Variant in ButtonVariant]: ButtonBaseStyles["backgroundColor"];
        };
    };
    label: InteractiveTextStyles;
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
                    variant={variant}
                    style={button.label}
                >
                    {label}
                </InteractiveText>
            )}
        </ButtonBase>
    );
};

Button.displayName = "Button";
