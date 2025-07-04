import type { FC } from "react";
import {
    type ColorValue,
    Pressable,
    type PressableProps,
    StyleSheet,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { Text } from "../Text";

export type ActionState = "default" | "disabled" | "pressed";
export type ActionVariant = "primary" | "secondary" | "destructive";

export type ActionStyles = {
    label: {
        /**
         * Font family due to weight limitations.
         */
        fontFamilyWeight: string;
        fontSize: number;
        color: {
            [Variant in ActionVariant]: { [State in ActionState]: ColorValue };
        };
    };
};

export interface ActionProps {
    label: string;
    variant?: ActionVariant;
    style?: DeepPartial<ActionStyles>;
    containerStyle?: PressableProps["style"];
    disabled?: boolean;
    onPress?: () => void;
}

export const Action: FC<ActionProps> = ({
    label,
    variant = "secondary",
    disabled: disabledProp,
    style,
    containerStyle,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;
    const [styles, { action }] = useThemedStylesWithOverride(
        createStyles,
        { action: style },
        { variant, disabled },
    );

    return (
        <Pressable
            hitSlop={20}
            disabled={disabled}
            onPress={onPress}
            style={containerStyle}
        >
            {({ pressed }) => (
                <Text
                    numberOfLines={1}
                    style={[
                        styles.label,
                        pressed && {
                            color: action.label.color[variant].pressed,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};

Action.displayName = "Action";

const createStyles = (
    { styles: { action } }: ThemedStyles,
    { variant, disabled }: Required<Pick<ActionProps, "variant" | "disabled">>,
) =>
    StyleSheet.create({
        label: {
            fontFamily: action.label.fontFamilyWeight,
            fontSize: action.label.fontSize,
            color: action.label.color[variant][
                disabled ? "disabled" : "default"
            ],
        },
    });
