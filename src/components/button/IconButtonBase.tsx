import { StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { ActionBase } from "../action";
import { type IconComponentProps, InteractiveIcon } from "../icon";
import type { ButtonBaseProps } from "./ButtonBase";
import type { IconButtonBaseStyles } from "./IconButtonBase.styles";

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
            props: { disabled },
        },
    );

    return (
        <ActionBase
            disabled={disabled}
            onPress={onPress}
            containerStyle={(pressableState) => [
                styles.iconButtonBase,
                pressableState.pressed && {
                    backgroundColor: style.container.backgroundColor.pressed,
                },
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
                    style={style.icon}
                />
            )}
        </ActionBase>
    );
};

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
