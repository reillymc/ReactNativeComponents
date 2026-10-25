import type { FC } from "react";
import { type ColorValue, type DimensionValue, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, type PropFilter, useComponent } from "../shared";
import { InteractionSurface, type InteractionSurfaceProps } from "../surface";

export type ButtonBaseTheme = {
    height: DimensionValue;
    width: {
        medium: DimensionValue;
    };
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number | `${number}%`;
    backgroundColor: ColorValue;
};

export interface ButtonBaseProps
    extends Pick<
        InteractionSurfaceProps,
        "children" | "disabled" | "highlighted" | "onPress" | "style"
    > {
    width?: "auto" | "medium";
    theme?: DeepPartial<ButtonBaseTheme>;
}

export const ButtonBase: FC<ButtonBaseProps> = ({
    style,
    disabled: disabledProp,
    highlighted,
    width = "auto",
    theme: themeOverrides,
    children,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;

    const { styles } = useComponent("buttonBase", {
        themeOverrides,
        props: { width },
        createStyles,
    });

    return (
        <InteractionSurface
            onPress={onPress}
            disabled={disabled}
            highlighted={highlighted}
            style={[styles.buttonBase, style]}
        >
            <View style={styles.innerContainer}>{children}</View>
        </InteractionSurface>
    );
};

const createStyles = defineStyles(
    (theme: ButtonBaseTheme, props: PropFilter<ButtonBaseProps, "width">) => ({
        buttonBase: {
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: theme.borderRadius,
            minHeight: theme.height,
            minWidth: props.width === "medium" ? theme.width.medium : undefined,
            backgroundColor: theme.backgroundColor,
        },
        innerContainer: {
            flex: props.width === "auto" ? 1 : undefined,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: theme.paddingHorizontal,
            paddingVertical: theme.paddingVertical,
        },
    }),
);
