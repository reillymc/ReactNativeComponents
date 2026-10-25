import type { DeepPartial } from "@reillymc/es-utils";

import type { IconComponentProps } from "../icon";
import { useComponent } from "../shared";
import type {
    ButtonAppearance,
    ButtonAppearanceTheme,
    ButtonVariant,
} from "./Button";
import { IconButtonBase, type IconButtonBaseProps } from "./IconButtonBase";

export type IconButtonVariant = ButtonVariant;

export type IconButtonTheme = {
    container: {
        size: number;
    };
    appearance: ButtonAppearanceTheme;
};

export interface IconButtonProps
    extends Pick<
        IconButtonBaseProps,
        "onPress" | "disabled" | "highlighted" | "style"
    > {
    variant?: IconButtonVariant;
    appearance?: ButtonAppearance;
    theme?: DeepPartial<IconButtonTheme>;
    onPress?: () => void;
}

export const IconButton = <G extends string>({
    variant = "primary",
    appearance = "subtle",
    theme: themeOverrides,
    ...props
}: IconButtonProps & IconComponentProps<G>) => {
    const { theme } = useComponent("iconButton", { themeOverrides });

    const content = theme.appearance[appearance].content[variant];
    const container =
        appearance === "prominent"
            ? theme.appearance.prominent.container[variant]
            : theme.appearance.subtle.container;

    return (
        <IconButtonBase
            {...props}
            theme={{
                container: {
                    backgroundColor: container,
                    size: theme.container.size,
                },
                icon: {
                    color: content,
                },
            }}
        />
    );
};
