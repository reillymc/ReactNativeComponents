import type { DimensionValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import type { InteractiveIconProps, InteractiveIconStyles } from "../icon";
import {
    IconButtonBase,
    type IconButtonBaseProps,
    type IconButtonBaseStyles,
} from "./IconButtonBase";

export type IconButtonVariant = "primary" | "secondary" | "destructive";

export type IconButtonStyles = {
    container: {
        size: DimensionValue;
        color: {
            [Variant in IconButtonVariant]: IconButtonBaseStyles["container"]["color"];
        };
    };
    icon: {
        color: {
            [Variant in IconButtonVariant]: InteractiveIconStyles["color"];
        };
    };
};

export interface IconButtonProps<G extends string, Fn extends string>
    extends Pick<
            IconButtonBaseProps<G, Fn>,
            "onPress" | "disabled" | "containerStyle"
        >,
        Pick<InteractiveIconProps<G, Fn>, "iconSet" | "iconName"> {
    variant?: IconButtonVariant;

    style?: DeepPartial<IconButtonStyles>;
    onPress?: () => void;
}

export const IconButton = <G extends string, Fn extends string>({
    variant = "primary",
    style,
    ...props
}: IconButtonProps<G, Fn>) => {
    const { iconButton } = useStylesWithOverride({
        iconButton: style,
    });

    return (
        <IconButtonBase
            {...props}
            style={{
                container: {
                    color: iconButton.container.color[variant],
                    size: iconButton.container.size,
                },
                icon: {
                    color: iconButton.icon.color[variant],
                },
            }}
        />
    );
};

IconButton.displayName = "IconButton";
