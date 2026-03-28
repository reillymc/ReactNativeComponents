import type { FC } from "react";
import {
    type ColorValue,
    type DimensionValue,
    StyleSheet,
    View,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
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
    style,
    children,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const [styles, { buttonBase }] = useThemedStylesWithOverride(
        createStyles,
        { buttonBase: style },
        { disabled, width },
    );

    return (
        <ActionBase
            onPress={onPress}
            disabled={disabled}
            containerStyle={(pressableState) => [
                styles.buttonBase,
                pressableState.pressed && {
                    backgroundColor: buttonBase.backgroundColor.pressed,
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
