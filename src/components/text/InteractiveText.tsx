import type { FC } from "react";
import {
    type ColorValue,
    type PressableStateCallbackType,
    StyleSheet,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { Text, type TextProps } from "./Text";

export type InteractiveTextState = "default" | "disabled" | "pressed";
export type InteractiveTextVariant = "primary" | "secondary" | "destructive";

export type InteractiveTextStyles = {
    color: {
        [Variant in InteractiveTextVariant]: {
            [State in InteractiveTextState]: ColorValue;
        };
    };
};

export interface InteractiveTextProps extends PressableStateCallbackType {
    children: string;
    style?: DeepPartial<InteractiveTextStyles>;
    textVariant?: TextProps["variant"];
    variant?: InteractiveTextVariant;
    disabled?: boolean;
}

export const InteractiveText: FC<InteractiveTextProps> = ({
    pressed,
    style,
    textVariant,
    children,
    variant = "secondary",
    disabled = false,
}) => {
    const [styles, { interactiveText }] = useThemedStylesWithOverride(
        createStyles,
        { interactiveText: style },
        { variant, disabled },
    );

    return (
        <Text
            numberOfLines={1}
            variant={textVariant}
            style={[
                styles.label,
                pressed && {
                    color: interactiveText.color[variant].pressed,
                },
            ]}
        >
            {children}
        </Text>
    );
};

const createStyles = (
    { styles: { interactiveText } }: ThemedStyles,
    {
        variant,
        disabled,
    }: Required<Pick<InteractiveTextProps, "variant" | "disabled">>,
) =>
    StyleSheet.create({
        label: {
            color: interactiveText.color[variant][
                disabled ? "disabled" : "default"
            ],
        },
    });
