import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import type { IconComponentProps, InteractiveIconStyles } from "../icon";
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

export const IconAction = <G extends string>({
    variant = "secondary",
    style,
    ...props
}: IconActionProps & IconComponentProps<G>) => {
    const { iconAction } = useStyles({ iconAction: style });

    return (
        <IconActionBase
            {...props}
            style={{
                icon: { color: iconAction.icon.color[variant] },
                text: { color: iconAction.text.color[variant] },
            }}
        />
    );
};
