import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import {
    InteractiveIcon,
    type InteractiveIconProps,
    type InteractiveIconStyles,
} from "../icon";
import {
    ButtonBase,
    type ButtonBaseProps,
    type ButtonBaseStyles,
} from "./ButtonBase";

export type IconButtonVariant = "primary" | "secondary";

export type IconButtonStyles = {
    container: ButtonBaseStyles;
    icon: InteractiveIconStyles;
};

export interface IconButtonProps<G extends string, Fn extends string>
    extends Pick<
            ButtonBaseProps,
            "onPress" | "disabled" | "size" | "variant" | "containerStyle"
        >,
        Pick<InteractiveIconProps<G, Fn>, "iconSet" | "iconName"> {
    style?: DeepPartial<IconButtonStyles>;
    onPress?: () => void;
}

export const IconButton = <G extends string, Fn extends string>({
    iconName,
    iconSet,
    variant = "primary",
    disabled: disabledProp,
    size,
    style,
    containerStyle,
    onPress,
}: IconButtonProps<G, Fn>) => {
    const disabled = disabledProp || !onPress;

    const { iconButton } = useStylesWithOverride({
        iconButton: style,
    });

    return (
        <ButtonBase
            style={iconButton.container}
            disabled={disabled}
            size={size}
            onPress={onPress}
            containerStyle={containerStyle}
        >
            {(pressableState) => (
                <InteractiveIcon
                    {...pressableState}
                    iconName={iconName}
                    iconSet={iconSet}
                    disabled={disabled}
                    variant={variant}
                    style={iconButton.icon}
                />
            )}
        </ButtonBase>
    );
};

IconButton.displayName = "IconButton";
