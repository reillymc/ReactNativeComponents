import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { componentWithIcon, type InteractiveIconStyles } from "../icon";
import {
    IconButtonBase,
    type IconButtonBaseProps,
    type IconButtonBaseStyles,
} from "./IconButtonBase";

export type IconButtonVariant = "primary" | "secondary" | "destructive";

export type IconButtonStyles = {
    container: {
        size: number;
        backgroundColor: Record<
            IconButtonVariant,
            IconButtonBaseStyles["container"]["backgroundColor"]
        >;
    };
    icon: {
        color: Record<IconButtonVariant, InteractiveIconStyles["color"]>;
    };
};

export interface IconButtonProps
    extends Pick<
        IconButtonBaseProps,
        "onPress" | "disabled" | "containerStyle"
    > {
    variant?: IconButtonVariant;
    style?: DeepPartial<IconButtonStyles>;
    onPress?: () => void;
}

export const IconButton = componentWithIcon<IconButtonProps>(
    ({ variant = "secondary", style, ...props }) => {
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
    },
);
