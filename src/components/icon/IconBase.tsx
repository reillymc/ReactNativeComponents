import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
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
    iconSet: IconSet,
}: IconBaseProps<G>) => {
    const { iconBase } = useStyles({ iconBase: style });

    return (
        <IconSet size={iconBase.size} color={iconBase.color} name={iconName} />
    );
};

IconBase.displayName = "IconBase";
