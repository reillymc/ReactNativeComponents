import {
    type ColorValue,
    type PressableStateCallbackType,
    StyleSheet,
} from "react-native";
import type { GlyphMap, Icon } from "@expo/vector-icons/build/createIconSet";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";

export type InteractiveIconState = "default" | "disabled" | "pressed";
export type InteractiveIconVariant = "primary" | "secondary" | "destructive";

export type InteractiveIconStyles = {
    size: number;
    color: {
        [Variant in InteractiveIconVariant]: {
            [State in InteractiveIconState]: ColorValue;
        };
    };
};

export interface InteractiveIconProps<G extends string, Fn extends string>
    extends PressableStateCallbackType {
    iconSet: Icon<G, Fn>;
    iconName: keyof GlyphMap<G>;
    style?: DeepPartial<InteractiveIconStyles>;
    variant?: InteractiveIconVariant;
    disabled?: boolean;
}

export const InteractiveIcon = <G extends string, Fn extends string>({
    iconSet: IconSet,
    iconName,
    pressed,
    style,
    variant = "secondary",
    disabled = false,
}: InteractiveIconProps<G, Fn>) => {
    const [styles, { interactiveIcon }] = useThemedStylesWithOverride(
        createStyles,
        { interactiveIcon: style },
        { variant, disabled },
    );

    return (
        <IconSet
            name={iconName}
            size={interactiveIcon.size}
            color={
                pressed
                    ? interactiveIcon.color[variant].pressed
                    : styles.icon.color
            }
        />
    );
};

const createStyles = (
    { styles: { interactiveIcon } }: ThemedStyles,
    {
        variant,
        disabled,
    }: Required<Pick<InteractiveIconProps<"", "">, "variant" | "disabled">>,
) =>
    StyleSheet.create({
        icon: {
            color: interactiveIcon.color[variant][
                disabled ? "disabled" : "default"
            ],
        },
    });
