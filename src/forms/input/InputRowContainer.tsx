import type { FC, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, type PropFilter, useComponent } from "../../internal";
import type { InputState } from "./InputBase";

export interface InputRowContainerTheme {
    borderRadius: number;
    backgroundColor: Record<InputState, ColorValue>;
}

export interface InputRowContainerProps {
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<InputRowContainerTheme>;
    children?: ReactNode;
}

/**
 * Shared horizontal shell for composite inputs whose children sit in a row
 * Owns the styled, disabled-aware surface so it stays consistent.
 */
export const InputRowContainer: FC<InputRowContainerProps> = ({
    disabled = false,
    style,
    theme: themeOverrides,
    children,
}) => {
    const { styles } = useComponent("inputRowContainer", {
        themeOverrides,
        props: { disabled },
        createStyles,
    });

    return <View style={[styles.container, style]}>{children}</View>;
};

const createStyles = defineStyles(
    (
        theme: InputRowContainerTheme,
        props: PropFilter<InputRowContainerProps, "disabled">,
    ) => ({
        container: {
            flexDirection: "row",
            overflow: "hidden",
            borderRadius: theme.borderRadius,
            backgroundColor:
                theme.backgroundColor[props.disabled ? "disabled" : "enabled"],
        },
    }),
);
