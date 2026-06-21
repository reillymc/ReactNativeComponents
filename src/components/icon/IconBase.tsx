import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride, useTheme } from "../../hooks";
import type { IconComponentProps } from "./componentWithIcon";

export interface IconBaseStyles {
    color: ColorValue;
    size: number;
}

export type IconBaseProps<G extends string> = IconComponentProps<G> & {
    style?: DeepPartial<IconBaseStyles>;
};

export const IconBase = <G extends string>({
    style,
    iconName,
    iconSet: OverrideIconSet,
}: IconBaseProps<G>) => {
    const { iconBase } = useStylesWithOverride({ iconBase: style });
    const {
        icons: { iconSet },
    } = useTheme();

    if (OverrideIconSet) {
        return (
            <OverrideIconSet
                size={iconBase.size}
                color={iconBase.color}
                name={iconName}
            />
        );
    }

    const IconSet = iconSet;

    return (
        <IconSet size={iconBase.size} color={iconBase.color} name={iconName} />
    );
};

IconBase.displayName = "IconBase";
