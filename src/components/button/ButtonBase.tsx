import type { FC } from "react";
import {
    type ColorValue,
    type DimensionValue,
    StyleSheet,
    View,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { InteractionSurface, type InteractionSurfaceProps } from "../surface";

export type ButtonBaseStyles = {
    height: DimensionValue;
    width: {
        medium: DimensionValue;
    };
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number | `${number}%`;
    backgroundColor: ColorValue;
};

export interface ButtonBaseProps
    extends Pick<
        InteractionSurfaceProps,
        "children" | "disabled" | "onPress" | "containerStyle"
    > {
    width?: "auto" | "medium";
    style?: DeepPartial<ButtonBaseStyles>;
}

export const ButtonBase: FC<ButtonBaseProps> = ({
    containerStyle,
    disabled: disabledProp,
    width = "auto",
    style: styleOverrides,
    children,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const [styles] = useThemedStyles("buttonBase", createStyles, {
        styles: { buttonBase: styleOverrides },
        props: { width },
    });

    return (
        <InteractionSurface
            onPress={onPress}
            disabled={disabled}
            containerStyle={[styles.buttonBase, containerStyle]}
        >
            <View style={styles.innerContainer}>{children}</View>
        </InteractionSurface>
    );
};

const createStyles = (
    { styles: { buttonBase } }: ThemedStyles,
    { width }: Required<Pick<ButtonBaseProps, "width">>,
) => {
    const styles = StyleSheet.create({
        buttonBase: {
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: buttonBase.borderRadius,
            minHeight: buttonBase.height,
            minWidth: width === "medium" ? buttonBase.width.medium : undefined,
            backgroundColor: buttonBase.backgroundColor,
        },
        innerContainer: {
            flex: width === "auto" ? 1 : undefined,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: buttonBase.paddingHorizontal,
            paddingVertical: buttonBase.paddingVertical,
        },
    });
    return styles;
};
