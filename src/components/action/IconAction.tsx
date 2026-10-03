import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import type { IconComponentProps } from "../icon";
import { IconActionBase, type IconActionBaseProps } from "./IconActionBase";

export type IconActionVariant = "primary" | "secondary" | "destructive";

export type IconActionStyles = {
    color: Record<IconActionVariant, ColorValue>;
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
            style={{ color: iconAction.color[variant] }}
        />
    );
};
