import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import { IconBase, type IconBaseProps, type IconBaseStyles } from "./IconBase";

export type IconSize = "small" | "medium" | "large";
export type IconVariant = "primary" | "secondary" | "text";

export interface IconStyles {
    color: IconBaseStyles["color"];
    size: Record<IconSize, IconBaseStyles["size"]>;
}

export interface IconProps<G extends string, Fn extends string>
    extends Pick<IconBaseProps<G, Fn>, "iconSet" | "iconName"> {
    size?: IconSize;
    style?: DeepPartial<IconStyles>;
}

export const Icon = <G extends string, Fn extends string>({
    iconSet,
    iconName,
    size = "medium",
    style,
}: IconProps<G, Fn>) => {
    const { icon } = useStylesWithOverride({ icon: style });

    return (
        <IconBase
            iconSet={iconSet}
            iconName={iconName}
            style={{ color: icon.color, size: icon.size[size] }}
        />
    );
};

Icon.displayName = "Icon";
