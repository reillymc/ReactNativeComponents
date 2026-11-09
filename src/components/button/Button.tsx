import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { InteractiveText } from "../text";
import type { ButtonStyles, ButtonVariant } from "./Button.styles";
import { ButtonBase, type ButtonBaseProps } from "./ButtonBase";

export type ButtonSize = "medium" | "large";

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

    const { button } = useStyles({
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
