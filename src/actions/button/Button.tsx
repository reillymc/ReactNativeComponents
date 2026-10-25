import type { FC } from "react";
import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../internal";
import { Text } from "../../typography/text";
import {
    ButtonBase,
    type ButtonBaseProps,
    type ButtonBaseTheme,
} from "./ButtonBase";

export type ButtonVariant = "primary" | "destructive";
export type ButtonAppearance = "prominent" | "subtle";

export type ButtonAppearanceTheme = {
    prominent: {
        container: Record<ButtonVariant, ColorValue>;
        content: Record<ButtonVariant, ColorValue>;
    };
    subtle: {
        container: ColorValue;
        content: Record<ButtonVariant, ColorValue>;
    };
};

export type ButtonTheme = {
    container: {
        borderRadius: ButtonBaseTheme["borderRadius"];
    };
    appearance: ButtonAppearanceTheme;
};

export interface ButtonProps
    extends Pick<
        ButtonBaseProps,
        "onPress" | "disabled" | "highlighted" | "width" | "style"
    > {
    variant?: ButtonVariant;
    appearance?: ButtonAppearance;
    label: string;
    theme?: DeepPartial<ButtonTheme>;
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = "primary",
    appearance = "subtle",
    disabled: disabledProp,
    theme: themeOverrides,
    onPress,
    ...props
}) => {
    const disabled = disabledProp || !onPress;

    const { theme } = useComponent("button", { themeOverrides });

    const content = theme.appearance[appearance].content[variant];
    const container =
        appearance === "prominent"
            ? theme.appearance.prominent.container[variant]
            : theme.appearance.subtle.container;

    return (
        <ButtonBase
            {...props}
            theme={{
                borderRadius: theme.container.borderRadius,
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
