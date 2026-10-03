import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import type { IconComponentProps } from "../icon";
import type {
    ButtonAppearance,
    ButtonAppearanceStyles,
    ButtonVariant,
} from "./Button";
import { IconButtonBase, type IconButtonBaseProps } from "./IconButtonBase";

export type IconButtonVariant = ButtonVariant;

export type IconButtonStyles = {
    container: {
        size: number;
    };
    appearance: ButtonAppearanceStyles;
};

export interface IconButtonProps
    extends Pick<
        IconButtonBaseProps,
        "onPress" | "disabled" | "containerStyle"
    > {
    variant?: IconButtonVariant;
    appearance?: ButtonAppearance;
    style?: DeepPartial<IconButtonStyles>;
    onPress?: () => void;
}

export const IconButton = <G extends string>({
    variant = "primary",
    appearance = "subtle",
    style,
    ...props
}: IconButtonProps & IconComponentProps<G>) => {
    const { iconButton } = useStyles({
        iconButton: style,
    });

    const content = iconButton.appearance[appearance].content[variant];
    const container =
        appearance === "prominent"
            ? iconButton.appearance.prominent.container[variant]
            : iconButton.appearance.subtle.container;

    return (
        <IconButtonBase
            {...props}
            style={{
                container: {
                    backgroundColor: container,
                    size: iconButton.container.size,
                },
                icon: {
                    color: content,
                },
            }}
        />
    );
};
