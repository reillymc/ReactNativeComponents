import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../internal";
import { IconBase, type IconBaseTheme } from "./IconBase";
import type { IconComponentProps } from "./IconComponentProps";

export type IconSize = "small" | "medium" | "large";

export interface IconTheme {
    color: IconBaseTheme["color"];
    size: Record<IconSize, IconBaseTheme["size"]>;
}

export type IconProps = {
    size?: IconSize;
    theme?: DeepPartial<IconTheme>;
};

export const Icon = <G extends string>({
    size = "medium",
    theme: themeOverrides,
    ...iconProps
}: IconProps & IconComponentProps<G>) => {
    const { theme } = useComponent("icon", { themeOverrides });

    return (
        <IconBase {...iconProps} size={theme.size[size]} color={theme.color} />
    );
};
