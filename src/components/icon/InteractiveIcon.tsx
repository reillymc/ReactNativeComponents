import type { PressableStateCallbackType } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import { Icon, type IconProps, type IconStyles } from "./Icon";

export type InteractiveIconState = "default" | "disabled" | "pressed";
export type InteractiveIconVariant = "primary" | "secondary" | "destructive";

export type InteractiveIconStyles = {
    size: IconStyles["size"];
    color: {
        [State in InteractiveIconState]: IconStyles["color"];
    };
};

export interface InteractiveIconProps<G extends string, Fn extends string>
    extends PressableStateCallbackType,
        Pick<IconProps<G, Fn>, "iconSet" | "iconName" | "size"> {
    style?: DeepPartial<InteractiveIconStyles>;
    disabled?: boolean;
}

export const InteractiveIcon = <G extends string, Fn extends string>({
    iconSet,
    iconName,
    pressed,
    style,
    size,
    disabled = false,
}: InteractiveIconProps<G, Fn>) => {
    const { interactiveIcon } = useStylesWithOverride({
        interactiveIcon: style,
    });

    return (
        <Icon
            iconSet={iconSet}
            iconName={iconName}
            size={size}
            style={{
                size: interactiveIcon.size,
                color: pressed
                    ? interactiveIcon.color.pressed
                    : interactiveIcon.color[disabled ? "disabled" : "default"],
            }}
        />
    );
};
