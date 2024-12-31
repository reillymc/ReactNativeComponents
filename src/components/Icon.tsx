import { AntDesign, Octicons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, TextStyle } from "react-native";

import { useTheme } from "../hooks";

export interface IconStyles {}

interface AntDesignProps {
    set?: never | "antdesign";
    iconName?: keyof typeof AntDesign.glyphMap;
}

interface OcticonsProps {
    set: "octicons";
    iconName?: keyof typeof Octicons.glyphMap;
}

export type IconProps = (AntDesignProps | OcticonsProps) & {
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
};

export const Icon: React.FC<IconProps> = ({ style, color, size = 20, iconName, set }) => {
    const { theme } = useTheme();

    if (set === "octicons") {
        return <Octicons size={size} color={color ?? theme.color.textPrimary} name={iconName} style={style} />;
    } else {
        return <AntDesign size={size} color={color ?? theme.color.textPrimary} name={iconName} style={style} />;
    }
};

Icon.displayName = "Icon";
