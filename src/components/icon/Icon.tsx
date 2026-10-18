import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { IconBase, type IconBaseStyles } from "./IconBase";
import type { IconComponentProps } from "./IconComponentProps";

export type IconSize = "small" | "medium" | "large";
export type IconVariant = "primary" | "secondary" | "text";

export interface IconStyles {
    color: IconBaseStyles["color"];
    size: Record<IconSize, IconBaseStyles["size"]>;
}

export type IconProps = {
    size?: IconSize;
    style?: DeepPartial<IconStyles>;
};

export const Icon = <G extends string>({
    size = "medium",
    style,
    ...iconProps
}: IconProps & IconComponentProps<G>) => {
    const { icon } = useStyles({ icon: style });

    return (
        <IconBase {...iconProps} size={icon.size[size]} color={icon.color} />
    );
};
