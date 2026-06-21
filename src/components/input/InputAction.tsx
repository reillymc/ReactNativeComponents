import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import {
    IconActionBase,
    type IconActionBaseProps,
    type IconActionBaseStyles,
} from "../action";
import { componentWithIcon } from "../icon";
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

export const InputAction = componentWithIcon<InputActionProps>(
    ({ disabled = false, containerStyle, variant = "regular", ...props }) => {
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
    },
);

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    {
        disabled,
        variant,
    }: Required<Pick<InputActionProps, "disabled" | "variant">>,
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
