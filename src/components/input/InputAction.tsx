import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import {
    IconActionBase,
    type IconActionBaseProps,
    type IconActionBaseStyles,
} from "../action";
import type { InputBaseProps } from "./InputBase";

export interface InputActionStyles {
    icon: Pick<IconActionBaseStyles["icon"], "color">;
}

export interface InputActionProps<G extends string, Fn extends string>
    extends Pick<
            IconActionBaseProps<G, Fn>,
            "iconSet" | "iconName" | "onPress" | "disabled" | "containerStyle"
        >,
        Pick<InputBaseProps, "variant"> {}

export const InputAction = <G extends string, Fn extends string>({
    disabled = false,
    containerStyle,
    variant = "regular",
    ...props
}: InputActionProps<G, Fn>) => {
    const [styles, { inputAction }] = useThemedStylesWithOverride(
        createStyles,
        {},
        { disabled, variant },
    );

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
            style={{ icon: inputAction.icon }}
        />
    );
};

InputAction.name = "InputAction";

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    {
        disabled,
        variant,
    }: Required<Pick<InputActionProps<"", "">, "disabled" | "variant">>,
) =>
    StyleSheet.create({
        container: {
            height: inputBase.container.height[variant],
            width: inputBase.container.height[variant],
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            alignItems: "center",
            justifyContent: "center",
        },
    });
