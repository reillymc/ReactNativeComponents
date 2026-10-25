import type { ColorValue, DimensionValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import { InteractionSurface } from "../surface";
import type { ButtonBaseProps, ButtonBaseTheme } from "./ButtonBase";

export type IconButtonBaseTheme = {
    container: {
        size: DimensionValue;
        padding: number;
        borderRadius: ButtonBaseTheme["borderRadius"];
        backgroundColor: ColorValue;
    };
    icon: {
        size: number;
        color: ColorValue;
    };
};

export interface IconButtonBaseProps
    extends Pick<
        ButtonBaseProps,
        "onPress" | "disabled" | "highlighted" | "style"
    > {
    theme?: DeepPartial<IconButtonBaseTheme>;
    onPress?: () => void;
}

export const IconButtonBase = <G extends string>({
    disabled: disabledProp,
    highlighted,
    theme: themeOverrides,
    style,
    onPress,
    ...iconProps
}: IconButtonBaseProps & IconComponentProps<G>) => {
    const disabled = disabledProp || !onPress;

    const { styles, theme } = useComponent("iconButtonBase", {
        themeOverrides,
        createStyles,
    });

    return (
        <InteractionSurface
            disabled={disabled}
            highlighted={highlighted}
            onPress={onPress}
            style={[styles.iconButtonBase, style]}
        >
            <IconBase
                {...iconProps}
                size={theme.icon.size}
                color={theme.icon.color}
            />
        </InteractionSurface>
    );
};

const createStyles = defineStyles((theme: IconButtonBaseTheme) => ({
    iconButtonBase: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.container.borderRadius,
        width: theme.container.size,
        height: theme.container.size,
        backgroundColor: theme.container.backgroundColor,
        padding: theme.container.padding,
    },
}));
