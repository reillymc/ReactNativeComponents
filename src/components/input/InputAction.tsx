import type { ColorValue } from "react-native";

import { IconActionBase, type IconActionBaseProps } from "../action";
import type { IconComponentProps } from "../icon";
import { defineStyles, type PropFilter, useComponent } from "../shared";
import type { InputBaseProps, InputState, InputVariant } from "./InputBase";

export interface InputActionTheme {
    color: ColorValue;
    height: Record<InputVariant, number>;
    backgroundColor: Record<InputState, ColorValue>;
}

export interface InputActionProps
    extends Pick<IconActionBaseProps, "onPress" | "disabled" | "style">,
        Pick<InputBaseProps, "variant"> {}

export const InputAction = <G extends string>({
    disabled = false,
    style,
    variant = "regular",
    ...props
}: InputActionProps & IconComponentProps<G>) => {
    const { styles, theme } = useComponent("inputAction", {
        props: { disabled, variant },
        createStyles,
    });

    return (
        <IconActionBase
            {...props}
            disabled={disabled}
            style={[styles.container, style]}
            theme={{ color: theme.color }}
        />
    );
};

const createStyles = defineStyles(
    (
        theme: InputActionTheme,
        props: PropFilter<InputActionProps, "disabled" | "variant">,
    ) => ({
        container: {
            minHeight: theme.height[props.variant],
            width: theme.height[props.variant],
            backgroundColor:
                theme.backgroundColor[props.disabled ? "disabled" : "enabled"],
            alignItems: "center",
            justifyContent: "center",
        },
    }),
);
