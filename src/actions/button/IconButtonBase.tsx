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
        | "onPress"
        | "disabled"
        | "highlighted"
        | "style"
        | "hitSlop"
        | "tabIndex"
        | "accessibilityLabel"
        | "onFocus"
        | "onBlur"
    > {
    theme?: DeepPartial<IconButtonBaseTheme>;
    onPress?: () => void;
}

export const IconButtonBase = <G extends string>({
    theme: themeOverrides,
    style,
    iconName,
    iconSet,
    ...props
}: IconButtonBaseProps & IconComponentProps<G>) => {
    const { styles, theme } = useComponent("iconButtonBase", {
        themeOverrides,
        createStyles,
    });

    return (
        <InteractionSurface {...props} style={[styles.iconButtonBase, style]}>
            <IconBase
                iconSet={iconSet}
                iconName={iconName}
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
