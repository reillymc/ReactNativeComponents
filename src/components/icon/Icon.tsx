import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import type { IconSize, IconStyles } from "./Icon.styles";
import { IconBase } from "./IconBase";
import type { IconComponentProps } from "./IconComponentProps";

export type IconVariant = "primary" | "secondary" | "text";

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
