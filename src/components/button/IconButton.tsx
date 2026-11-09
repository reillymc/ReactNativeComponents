import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import type { IconComponentProps } from "../icon";
import type { IconButtonStyles, IconButtonVariant } from "./IconButton.styles";
import { IconButtonBase, type IconButtonBaseProps } from "./IconButtonBase";

export interface IconButtonProps
    extends Pick<
        IconButtonBaseProps,
        "onPress" | "disabled" | "containerStyle"
    > {
    variant?: IconButtonVariant;
    style?: DeepPartial<IconButtonStyles>;
    onPress?: () => void;
}

export const IconButton = <G extends string>({
    variant = "secondary",
    style,
    ...props
}: IconButtonProps & IconComponentProps<G>) => {
    const { iconButton } = useStyles({
        iconButton: style,
    });

    return (
        <IconButtonBase
            {...props}
            style={{
                container: {
                    backgroundColor:
                        iconButton.container.backgroundColor[variant],
                    size: iconButton.container.size,
                },
                icon: {
                    color: iconButton.icon.color[variant],
                },
            }}
        />
    );
};
