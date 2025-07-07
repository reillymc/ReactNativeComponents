import type { ColorValue } from "react-native";
import type {
    GlyphMap,
    Icon as IconSet,
} from "@expo/vector-icons/build/createIconSet";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";

export interface IconBaseStyles {
    color: ColorValue;
    size: number;
}

export interface IconBaseProps<G extends string, Fn extends string> {
    iconSet: IconSet<G, Fn>;
    iconName: keyof GlyphMap<G>;
    style?: DeepPartial<IconBaseStyles>;
}

export const IconBase = <G extends string, Fn extends string>({
    iconSet: IconSet,
    iconName,
    style,
}: IconBaseProps<G, Fn>) => {
    const { iconBase } = useStylesWithOverride({ iconBase: style });

    return (
        <IconSet size={iconBase.size} color={iconBase.color} name={iconName} />
    );
};

IconBase.displayName = "IconBase";
