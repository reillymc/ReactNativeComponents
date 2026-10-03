import { type ColorValue, type DimensionValue, StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconBase, type IconComponentProps } from "../icon";
import { InteractionSurface } from "../surface";
import type { ButtonBaseProps, ButtonBaseStyles } from "./ButtonBase";

export type IconButtonBaseStyles = {
    container: {
        size: DimensionValue;
        padding: number;
        borderRadius: ButtonBaseStyles["borderRadius"];
        backgroundColor: ColorValue;
    };
    icon: {
        size: number;
        color: ColorValue;
    };
};

export interface IconButtonBaseProps
    extends Pick<ButtonBaseProps, "onPress" | "disabled" | "containerStyle"> {
    style?: DeepPartial<IconButtonBaseStyles>;
    onPress?: () => void;
}

export const IconButtonBase = <G extends string>({
    disabled: disabledProp,
    style: styleOverrides,
    containerStyle,
    onPress,
    ...iconProps
}: IconButtonBaseProps & IconComponentProps<G>) => {
    const disabled = disabledProp || !onPress;

    const [styles, { style }] = useThemedStyles(
        "iconButtonBase",
        createStyles,
        {
            styles: { iconButtonBase: styleOverrides },
        },
    );

    return (
        <InteractionSurface
            disabled={disabled}
            onPress={onPress}
            containerStyle={[styles.iconButtonBase, containerStyle]}
        >
            <IconBase
                {...iconProps}
                size={style.icon.size}
                color={style.icon.color}
            />
        </InteractionSurface>
    );
};

const createStyles = ({ styles: { iconButtonBase } }: ThemedStyles) =>
    StyleSheet.create({
        iconButtonBase: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: iconButtonBase.container.borderRadius,
            width: iconButtonBase.container.size,
            height: iconButtonBase.container.size,
            backgroundColor: iconButtonBase.container.backgroundColor,
            padding: iconButtonBase.container.padding,
        },
    });
