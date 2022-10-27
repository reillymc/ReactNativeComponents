import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Portal } from "@gorhom/portal";

export interface FloatingContainerProps {
    style?: ViewStyle;
    position: {
        x: number | undefined;
        y: number | undefined;
        offsetX?: number;
        offsetY?: number;
    };

    children?: React.ReactNode;
}

export const FloatingContainer = React.forwardRef<View, FloatingContainerProps>(
    ({ style, position, children }, ref) => {
        const styles = createStyles({ position });

        return (
            <Portal>
                <View ref={ref} style={[styles.container, style]}>
                    {children}
                </View>
            </Portal>
        );
    },
);

FloatingContainer.displayName = "FloatingContainer";

const createStyles = ({ position: { x = 0, y = 0, offsetX = 0, offsetY = 0 } }: FloatingContainerProps) =>
    StyleSheet.create({
        container: {
            position: "absolute",
            top: y + offsetY,
            left: x + offsetX,
        },
    });
