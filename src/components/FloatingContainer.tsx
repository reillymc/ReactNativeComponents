import React from "react";
import { StyleProp, StyleSheet, useColorScheme, View, ViewStyle } from "react-native";
import { Portal } from "@gorhom/portal";
import { BlurView } from "expo-blur";

export interface FloatingContainerProps {
    style?: StyleProp<ViewStyle>;
    position: {
        x?: number;
        y?: number;
        inverted?: boolean;
    };

    children?: React.ReactNode;
}

export const FloatingContainer = React.forwardRef<View, FloatingContainerProps>(
    ({ style, position, children }, ref) => {
        const styles = createStyles({ position });
        const colorScheme = useColorScheme();

        return (
            <Portal>
                <BlurView
                    ref={ref}
                    intensity={1}
                    tint={colorScheme === "dark" ? "dark" : "light"}
                    style={[position.inverted ? styles.containerInverse : styles.container, style]}
                >
                    {children}
                </BlurView>
            </Portal>
        );
    },
);

FloatingContainer.displayName = "FloatingContainer";

const createStyles = ({ position: { x = 0, y = 0 } }: FloatingContainerProps) => (
    console.log(x, y),
    StyleSheet.create({
        container: {
            position: "absolute",
            top: y,
            left: x,
        },
        containerInverse: {
            position: "absolute",
            bottom: y,
            left: x,
        },
    })
);
