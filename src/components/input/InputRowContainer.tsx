import type { FC, ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

import { type ThemedStyles, useThemedStylesExternal } from "../../hooks";

export interface InputRowContainerProps {
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

/**
 * Shared horizontal shell for composite inputs whose children sit in a row
 * Owns the styled, disabled-aware surface so it stays consistent.
 */
export const InputRowContainer: FC<InputRowContainerProps> = ({
    disabled = false,
    style,
    children,
}) => {
    const styles = useThemedStylesExternal(createStyles, {
        props: { disabled },
    });

    return <View style={[styles.container, style]}>{children}</View>;
};

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    { disabled }: Required<Pick<InputRowContainerProps, "disabled">>,
) => {
    const { borderRadius } = inputBase.container;

    return StyleSheet.create({
        container: {
            flexDirection: "row",
            overflow: "hidden",
            borderRadius,
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
        },
    });
};
