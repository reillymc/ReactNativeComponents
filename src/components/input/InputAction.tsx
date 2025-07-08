import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import {
    IconActionBase,
    type IconActionBaseProps,
    type IconActionBaseStyles,
} from "../action";

export interface InputActionStyles {
    icon: Pick<IconActionBaseStyles["icon"], "color">;
}

export interface InputActionProps<G extends string, Fn extends string>
    extends Pick<
        IconActionBaseProps<G, Fn>,
        "iconSet" | "iconName" | "onPress" | "disabled" | "containerStyle"
    > {}

export const InputAction = <G extends string, Fn extends string>({
    disabled = false,
    containerStyle,
    ...props
}: InputActionProps<G, Fn>) => {
    const [styles, { inputAction }] = useThemedStylesWithOverride(
        createStyles,
        {},
        { disabled },
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
    { disabled }: Required<Pick<InputActionProps<"", "">, "disabled">>,
) =>
    StyleSheet.create({
        container: {
            height: inputBase.container.height,
            width: inputBase.container.height,
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            alignItems: "center",
            justifyContent: "center",
        },
    });
