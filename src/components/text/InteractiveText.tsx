import type { FC } from "react";
import type { PressableStateCallbackType } from "react-native";
import { StyleSheet } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { InteractiveTextStyles } from "./InteractiveText.styles";
import { Text, type TextProps } from "./Text";

export interface InteractiveTextProps extends PressableStateCallbackType {
    children: string;
    style?: DeepPartial<InteractiveTextStyles>;
    textVariant?: TextProps["variant"];
    disabled?: boolean;
}

export const InteractiveText: FC<InteractiveTextProps> = ({
    pressed,
    style: styleOverrides,
    textVariant,
    children,
    disabled = false,
}) => {
    const [styles, { style }] = useThemedStyles(
        "interactiveText",
        createStyles,
        {
            styles: { interactiveText: styleOverrides },
            props: { disabled },
        },
    );

    return (
        <Text
            numberOfLines={1}
            variant={textVariant}
            style={[styles.label, pressed && { color: style.color.pressed }]}
        >
            {children}
        </Text>
    );
};

const createStyles = (
    { styles: { interactiveText } }: ThemedStyles,
    { disabled }: Required<Pick<InteractiveTextProps, "disabled">>,
) =>
    StyleSheet.create({
        label: {
            color: interactiveText.color[disabled ? "disabled" : "enabled"],
        },
    });
