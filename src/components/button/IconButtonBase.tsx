import { type DimensionValue, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { ActionBase } from "../action";
import {
    InteractiveIcon,
    type InteractiveIconProps,
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

export interface IconButtonBaseProps<G extends string, Fn extends string>
    extends Pick<ButtonBaseProps, "onPress" | "disabled" | "containerStyle">,
        Pick<InteractiveIconProps<G, Fn>, "iconSet" | "iconName"> {
    style?: DeepPartial<IconButtonBaseStyles>;
    onPress?: () => void;
}

export const IconButtonBase = <G extends string, Fn extends string>({
    iconName,
    iconSet,
    disabled: disabledProp,
    style,
    containerStyle,
    onPress,
}: IconButtonBaseProps<G, Fn>) => {
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
                styles.iconButtonBase,
                typeof containerStyle === "function"
                    ? containerStyle(pressableState)
                    : containerStyle,
            ]}
        >
            {(pressableState) => (
                <InteractiveIcon
                    {...pressableState}
                    iconName={iconName}
                    iconSet={iconSet}
                    disabled={disabled}
                    style={iconButtonBase.icon}
                />
            )}
        </ActionBase>
    );
};

const createStyles = (
    { styles: { iconButtonBase } }: ThemedStyles,
    { disabled }: Required<Pick<IconButtonBaseProps<"", "">, "disabled">>,
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
