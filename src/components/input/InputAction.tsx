import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import {
    IconActionBase,
    type IconActionBaseProps,
    type IconActionBaseStyles,
} from "../action";
import type { IconComponentProps } from "../icon";
import type { InputBaseProps } from "./InputBase";

export interface InputActionStyles {
    icon: Pick<IconActionBaseStyles["icon"], "color">;
}

export interface InputActionProps
    extends Pick<
            IconActionBaseProps,
            "onPress" | "disabled" | "containerStyle"
        >,
        Pick<InputBaseProps, "variant"> {}

export const InputAction = <G extends string>({
    disabled = false,
    containerStyle,
    variant = "regular",
    ...props
}: InputActionProps & IconComponentProps<G>) => {
    const [styles, { style }] = useThemedStyles("inputAction", createStyles, {
        props: { disabled, variant },
    });

    return (
        <IconActionBase
            {...props}
            disabled={disabled}
            containerStyle={(pressableState) => [
                styles.container,
                typeof containerStyle === "function"
                    ? containerStyle(pressableState)
                    : containerStyle,
            ]}
            style={{ icon: style.icon }}
        />
    );
};

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    {
        disabled,
        variant,
    }: Required<Pick<InputActionProps, "disabled" | "variant">>,
) => {
    const { height } = inputBase.container;

    return StyleSheet.create({
        container: {
            minHeight: height[variant],
            width: height[variant],
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            alignItems: "center",
            justifyContent: "center",
        },
    });
};
