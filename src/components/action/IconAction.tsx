import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import type { InteractiveIconStyles } from "../icon";
import type { InteractiveTextStyles } from "../text";
import { IconActionBase, type IconActionBaseProps } from "./IconActionBase";

export type IconActionVariant = "primary" | "secondary" | "destructive";

export type IconActionStyles = {
    text: {
        color: {
            [Variant in IconActionVariant]: InteractiveTextStyles["color"];
        };
    };
    icon: {
        color: {
            [Variant in IconActionVariant]: InteractiveIconStyles["color"];
        };
    };
};

export interface IconActionProps<G extends string, Fn extends string>
    extends Omit<IconActionBaseProps<G, Fn>, "style"> {
    variant?: IconActionVariant;
    style?: DeepPartial<IconActionStyles>;
}

export const IconAction = <G extends string, Fn extends string>({
    variant = "secondary",
    disabled: disabledProp,
    style,
    onPress,
    ...props
}: IconActionProps<G, Fn>) => {
    const disabled = disabledProp || !onPress;

    const { iconAction } = useStylesWithOverride({ iconAction: style });

    return (
        <IconActionBase
            {...props}
            disabled={disabled}
            onPress={onPress}
            style={{
                icon: { color: iconAction.icon.color[variant] },
                text: { color: iconAction.text.color[variant] },
            }}
        />
    );
};

IconAction.displayName = "IconAction";
