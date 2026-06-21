import { type DimensionValue, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { ActionBase } from "../action";
import {
    componentWithIcon,
    InteractiveIcon,
    type InteractiveIconStyles,
} from "../icon";
import type { ButtonBaseProps, ButtonBaseStyles } from "./ButtonBase";

export type IconButtonBaseStyles = {
    container: {
        size: DimensionValue;
        padding: number;
        borderRadius: ButtonBaseStyles["borderRadius"];
        backgroundColor: ButtonBaseStyles["backgroundColor"];
    };
    icon: InteractiveIconStyles;
};

export interface IconButtonBaseProps
    extends Pick<ButtonBaseProps, "onPress" | "disabled" | "containerStyle"> {
    style?: DeepPartial<IconButtonBaseStyles>;
    onPress?: () => void;
}

export const IconButtonBase = componentWithIcon<IconButtonBaseProps>(
    ({
        disabled: disabledProp,
        style,
        containerStyle,
        onPress,
        ...iconProps
    }) => {
        const disabled = disabledProp || !onPress;

        const [styles, { iconButtonBase }] = useThemedStylesWithOverride(
            createStyles,
            { iconButtonBase: style },
            { disabled },
        );

        return (
            <ActionBase
                disabled={disabled}
                onPress={onPress}
                containerStyle={(pressableState) => [
                    pressableState.pressed
                        ? {
                              backgroundColor:
                                  iconButtonBase.container.backgroundColor
                                      .pressed,
                          }
                        : undefined,
                    styles.iconButtonBase,
                    typeof containerStyle === "function"
                        ? containerStyle(pressableState)
                        : containerStyle,
                ]}
            >
                {(pressableState) => (
                    <InteractiveIcon
                        {...pressableState}
                        {...iconProps}
                        disabled={disabled}
                        style={iconButtonBase.icon}
                    />
                )}
            </ActionBase>
        );
    },
);

const createStyles = (
    { styles: { iconButtonBase } }: ThemedStyles,
    { disabled }: Required<Pick<IconButtonBaseProps, "disabled">>,
) => {
    const styles = StyleSheet.create({
        iconButtonBase: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: iconButtonBase.container.borderRadius,
            minHeight: iconButtonBase.container.size,
            minWidth: iconButtonBase.container.size,
            backgroundColor:
                iconButtonBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            padding: iconButtonBase.container.padding,
        },
    });
    return styles;
};
