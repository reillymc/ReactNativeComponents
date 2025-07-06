import type { DimensionValue } from "react-native";
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

export type IconButtonBaseStyles = {
    container: {
        size: DimensionValue;
        padding: ButtonBaseStyles["padding"];
        borderRadius: ButtonBaseStyles["borderRadius"];
        color: ButtonBaseStyles["color"];
    };
    icon: InteractiveIconStyles;
};

export interface IconButtonBaseProps<G extends string, Fn extends string>
    extends Pick<ButtonBaseProps, "onPress" | "disabled" | "containerStyle">,
        Pick<InteractiveIconProps<G, Fn>, "iconSet" | "iconName"> {
    style?: DeepPartial<IconButtonBaseStyles>;
    onPress?: () => void;
}

export const IconButtonBase = <G extends string, Fn extends string>({
    iconName,
    iconSet,
    disabled: disabledProp,
    style,
    containerStyle,
    onPress,
}: IconButtonBaseProps<G, Fn>) => {
    const disabled = disabledProp || !onPress;

    const { iconButtonBase } = useStylesWithOverride({
        iconButtonBase: style,
    });

    return (
        <ButtonBase
            style={{
                height: iconButtonBase.container.size,
                width: iconButtonBase.container.size,
                padding: iconButtonBase.container.padding,
                borderRadius: iconButtonBase.container.borderRadius,
                color: iconButtonBase.container.color,
            }}
            disabled={disabled}
            onPress={onPress}
            containerStyle={containerStyle}
        >
            {(pressableState) => (
                <InteractiveIcon
                    {...pressableState}
                    iconName={iconName}
                    iconSet={iconSet}
                    disabled={disabled}
                    style={iconButtonBase.icon}
                />
            )}
        </ButtonBase>
    );
};

IconButtonBase.displayName = "IconButtonBase";
