import type { FC } from "react";
import {
    type ColorValue,
    type DimensionValue,
    StyleSheet,
    View,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { ActionBase, type ActionBaseProps } from "../action";

export type ButtonState = "enabled" | "disabled" | "pressed";

export type ButtonBaseStyles = {
    height: DimensionValue;
    width: {
        medium: DimensionValue;
    };
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number | `${number}%`;
    backgroundColor: Record<ButtonState, ColorValue>;
};

export interface ButtonBaseProps
    extends Pick<
        ActionBaseProps,
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

    const [styles, { style }] = useThemedStyles("buttonBase", createStyles, {
        styles: { buttonBase: styleOverrides },
        props: { disabled, width },
    });

    return (
        <ActionBase
            onPress={onPress}
            disabled={disabled}
            containerStyle={(pressableState) => [
                styles.buttonBase,
                pressableState.pressed && {
                    backgroundColor: style.backgroundColor.pressed,
                },
                typeof containerStyle === "function"
                    ? containerStyle(pressableState)
                    : containerStyle,
            ]}
        >
            {(pressableState) => (
                <View style={styles.innerContainer}>
                    {typeof children === "function"
                        ? children(pressableState)
                        : children}
                </View>
            )}
        </ActionBase>
    );
};

const createStyles = (
    { styles: { buttonBase } }: ThemedStyles,
    { disabled, width }: Required<Pick<ButtonBaseProps, "disabled" | "width">>,
) => {
    const styles = StyleSheet.create({
        buttonBase: {
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: buttonBase.borderRadius,
            minHeight: buttonBase.height,
            minWidth: width === "medium" ? buttonBase.width.medium : undefined,
            backgroundColor:
                buttonBase.backgroundColor[disabled ? "disabled" : "enabled"],
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
