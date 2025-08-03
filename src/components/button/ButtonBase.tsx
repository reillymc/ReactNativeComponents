import type { FC } from "react";
import { type ColorValue, type DimensionValue, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { ActionBase, type ActionBaseProps } from "../action";

export type ButtonState = "enabled" | "disabled" | "pressed";

export type ButtonBaseStyles = {
    height: DimensionValue;
    width: DimensionValue;
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
    style?: DeepPartial<ButtonBaseStyles>;
}

export const ButtonBase: FC<ButtonBaseProps> = ({
    containerStyle,
    disabled: disabledProp,
    style,
    children,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const [styles, { buttonBase }] = useThemedStylesWithOverride(
        createStyles,
        { buttonBase: style },
        { disabled },
    );

    return (
        <ActionBase
            onPress={onPress}
            disabled={disabled}
            containerStyle={(pressableState) => [
                styles.button,
                pressableState.pressed && {
                    backgroundColor: buttonBase.backgroundColor.pressed,
                },
                typeof containerStyle === "function"
                    ? containerStyle(pressableState)
                    : containerStyle,
            ]}
        >
            {children}
        </ActionBase>
    );
};

const createStyles = (
    { styles: { buttonBase } }: ThemedStyles,
    { disabled }: Required<Pick<ButtonBaseProps, "disabled">>,
) => {
    const styles = StyleSheet.create({
        button: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: buttonBase.borderRadius,
            minHeight: buttonBase.height,
            minWidth: buttonBase.width,
            backgroundColor:
                buttonBase.backgroundColor[disabled ? "disabled" : "enabled"],
            paddingHorizontal: buttonBase.paddingHorizontal,
            paddingVertical: buttonBase.paddingVertical,
        },
    });
    return styles;
};
