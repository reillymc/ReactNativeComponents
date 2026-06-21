import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { componentWithIcon } from "./componentWithIcon";
import { IconBase, type IconBaseStyles } from "./IconBase";

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

export const Icon = componentWithIcon<IconProps>(
    ({ size = "medium", style, ...iconProps }) => {
        const { icon } = useStyles({ icon: style });

        return (
            <IconBase
                {...iconProps}
                style={{ color: icon.color, size: icon.size[size] }}
            />
        );
    },
);
