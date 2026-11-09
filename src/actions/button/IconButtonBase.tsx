import type { ColorValue, DimensionValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import { TextBase, type TextBaseTheme } from "../../typography/text";
import { InteractionSurface } from "../surface";
import type { ButtonBaseProps, ButtonBaseTheme } from "./ButtonBase";

export type IconButtonBaseTheme = {
    container: {
        size: DimensionValue;
        padding: number;
        gap: number;
        borderRadius: ButtonBaseTheme["borderRadius"];
        backgroundColor: ColorValue;
    };
    icon: {
        size: number;
        color: ColorValue;
    };
    label: TextBaseTheme;
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
    label?: string;
    theme?: DeepPartial<IconButtonBaseTheme>;
    onPress?: () => void;
}

export const IconButtonBase = <G extends string>({
    label,
    theme: themeOverrides,
    style,
    iconName,
    iconSet,
    ...props
}: IconButtonBaseProps & IconComponentProps<G>) => {
    const { styles, theme } = useComponent("iconButtonBase", {
        themeOverrides,
        props: { hasLabel: !!label },
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
            {!!label && (
                <TextBase
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    theme={theme.label}
                    style={styles.label}
                >
                    {label}
                </TextBase>
            )}
        </InteractionSurface>
    );
};

const createStyles = defineStyles(
    (theme: IconButtonBaseTheme, props: { hasLabel: boolean }) => ({
        iconButtonBase: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: props.hasLabel ? "column" : "row",
            borderRadius: theme.container.borderRadius,
            width: theme.container.size,
            height: props.hasLabel ? undefined : theme.container.size,
            gap: props.hasLabel ? theme.container.gap : undefined,
            backgroundColor: theme.container.backgroundColor,
            padding: theme.container.padding,
        },
        label: {
            width: "100%",
            textAlign: "center",
        },
    }),
);
