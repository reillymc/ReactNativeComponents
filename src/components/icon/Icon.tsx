import type { ColorValue } from "react-native";
import type {
    GlyphMap,
    Icon as IconSet,
} from "@expo/vector-icons/build/createIconSet";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";

export type IconSize = "small" | "medium" | "large";

export interface IconStyles {
    color: ColorValue;
    size: {
        [Size in IconSize]: number;
    };
}

export interface IconProps<G extends string, Fn extends string> {
    iconSet: IconSet<G, Fn>;
    iconName: keyof GlyphMap<G>;
    size?: IconSize;
    style?: DeepPartial<IconStyles>;
}

export const Icon = <G extends string, Fn extends string>({
    iconSet: IconSet,
    iconName,
    size = "medium",
    style,
}: IconProps<G, Fn>) => {
    const { icon } = useStylesWithOverride({ icon: style });

    return (
        <IconSet size={icon.size[size]} color={icon.color} name={iconName} />
    );
};

Icon.displayName = "Icon";
