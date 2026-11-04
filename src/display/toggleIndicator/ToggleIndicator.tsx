import type { ColorValue, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import type { SizeVariant } from "../../theme/size";

export type ToggleIndicatorIcons = ComponentIconAssets<
    "outline" | "fill" | "check"
>;

export type ToggleAppearance = "primary" | "secondary";

export type ToggleIndicatorTheme = {
    surfaceSize: Record<SizeVariant, number>;
    iconSize: Record<SizeVariant, number>;
    color: {
        selected: Record<ToggleAppearance, ColorValue>;
        deselected: ColorValue;
        icon: Record<ToggleAppearance, ColorValue>;
    };
};

export type ToggleIndicatorProps<G extends string> = {
    value?: boolean;
    appearance?: ToggleAppearance;
    variant?: SizeVariant;
    theme?: DeepPartial<ToggleIndicatorTheme>;
    style?: StyleProp<ViewStyle>;
} & Partial<IconComponentProps<G>>;

export const ToggleIndicator = <G extends string>({
    value = false,
    appearance = "primary",
    variant = "regular",
    theme: themeOverrides,
    style,
    iconSet,
    iconName,
}: ToggleIndicatorProps<G>) => {
    const { styles, theme, icons } = useComponent("toggleIndicator", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    const indicatorSize = theme.surfaceSize[variant];
    const selectedFillColor = theme.color.selected[appearance];
    const selectedIconColor = theme.color.icon[appearance];
    const customIconSize = theme.iconSize[variant];
    const selectedIcon =
        iconSet && iconName ? { iconSet, iconName } : icons.check;

    return (
        <View style={[styles.iconContainer, style]}>
            <IconBase
                {...(value ? icons.fill : icons.outline)}
                size={indicatorSize}
                color={value ? selectedFillColor : theme.color.deselected}
            />
            {!!value && (
                <View style={styles.icon}>
                    <IconBase
                        {...selectedIcon}
                        size={customIconSize}
                        color={selectedIconColor}
                    />
                </View>
            )}
        </View>
    );
};

const createStyles = defineStyles(
    (theme: ToggleIndicatorTheme, props: { variant: SizeVariant }) => ({
        iconContainer: {
            width: theme.surfaceSize[props.variant],
            height: theme.surfaceSize[props.variant],
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
        },
    }),
);
