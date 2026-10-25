import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../shared";
import type { IconComponentProps } from "./IconComponentProps";

export interface IconBaseTheme {
    color: ColorValue;
    size: number;
}

export type IconBaseProps<G extends string> = IconComponentProps<G> & {
    size?: IconBaseTheme["size"];
    color?: IconBaseTheme["color"];
    theme?: DeepPartial<IconBaseTheme>;
};

export const IconBase = <G extends string>({
    iconSet: IconSet,
    iconName,
    size,
    color,
    theme: themeOverrides,
}: IconBaseProps<G>) => {
    const { theme } = useComponent("iconBase", { themeOverrides });

    return (
        <IconSet
            size={size ?? theme.size}
            color={color ?? theme.color}
            name={iconName}
        />
    );
};
