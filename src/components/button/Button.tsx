import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import { InteractiveText, type InteractiveTextStyles } from "../text";
import {
    ButtonBase,
    type ButtonBaseProps,
    type ButtonBaseStyles,
} from "./ButtonBase";

export type ButtonStyles = {
    container: ButtonBaseStyles;
    label: InteractiveTextStyles;
};

export interface ButtonProps
    extends Pick<
        ButtonBaseProps,
        "onPress" | "disabled" | "size" | "variant" | "containerStyle"
    > {
    label: string;
    style?: DeepPartial<ButtonStyles>;
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = "primary",
    size = "large",
    disabled: disabledProp,
    style,
    containerStyle,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const { button } = useStylesWithOverride({
        iconButton: style,
    });

    return (
        <ButtonBase
            style={button.container}
            onPress={onPress}
            disabled={disabled}
            variant={variant}
            size={size}
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
