import type { FC } from "react";
import {
    type ColorValue,
    type PressableStateCallbackType,
    StyleSheet,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { Text } from "../Text";

export type InteractiveTextState = "default" | "disabled" | "pressed";
export type InteractiveTextVariant = "primary" | "secondary" | "destructive";

export type InteractiveTextStyles = {
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
    fontSize: number;
    color: {
        [Variant in InteractiveTextVariant]: {
            [State in InteractiveTextState]: ColorValue;
        };
    };
};

export interface InteractiveTextProps extends PressableStateCallbackType {
    label: string;
    style?: DeepPartial<InteractiveTextStyles>;
    variant?: InteractiveTextVariant;
    disabled?: boolean;
}

export const InteractiveText: FC<InteractiveTextProps> = ({
    pressed,
    style,
    label,
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
            style={[
                styles.label,
                pressed && {
                    color: interactiveText.color[variant].pressed,
                },
            ]}
        >
            {label}
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
            fontFamily: interactiveText.fontFamilyWeight,
            fontSize: interactiveText.fontSize,
            color: interactiveText.color[variant][
                disabled ? "disabled" : "default"
            ],
        },
    });
