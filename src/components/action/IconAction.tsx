import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import { componentWithIcon, type InteractiveIconStyles } from "../icon";
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

export interface IconActionProps extends Omit<IconActionBaseProps, "style"> {
    variant?: IconActionVariant;
    style?: DeepPartial<IconActionStyles>;
}

export const IconAction = componentWithIcon<IconActionProps>(
    ({ variant = "secondary", style, ...props }) => {
        const { iconAction } = useStylesWithOverride({ iconAction: style });

        return (
            <IconActionBase
                {...props}
                style={{
                    icon: { color: iconAction.icon.color[variant] },
                    text: { color: iconAction.text.color[variant] },
                }}
            />
        );
    },
);
