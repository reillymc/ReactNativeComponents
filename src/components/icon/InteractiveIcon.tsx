import type { PressableStateCallbackType } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import { IconBase, type IconBaseProps, type IconBaseStyles } from "./IconBase";

export type InteractiveIconState = "enabled" | "disabled" | "pressed";
export type InteractiveIconVariant = "primary" | "secondary" | "destructive";

export type InteractiveIconStyles = {
    size: IconBaseStyles["size"];
    color: {
        [State in InteractiveIconState]: IconBaseStyles["color"];
    };
};

export interface InteractiveIconProps<G extends string, Fn extends string>
    extends PressableStateCallbackType,
        Pick<IconBaseProps<G, Fn>, "iconSet" | "iconName"> {
    style?: DeepPartial<InteractiveIconStyles>;
    disabled?: boolean;
}

export const InteractiveIcon = <G extends string, Fn extends string>({
    iconSet,
    iconName,
    pressed,
    style,
    disabled = false,
}: InteractiveIconProps<G, Fn>) => {
    const { interactiveIcon } = useStylesWithOverride({
        interactiveIcon: style,
    });

    return (
        <IconBase
            iconSet={iconSet}
            iconName={iconName}
            style={{
                size: interactiveIcon.size,
                color: pressed
                    ? interactiveIcon.color.pressed
                    : interactiveIcon.color[disabled ? "disabled" : "enabled"],
            }}
        />
    );
};
