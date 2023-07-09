import React from "react";
import { StyleProp, StyleSheet, useColorScheme, View, ViewStyle } from "react-native";
import { Portal } from "@gorhom/portal";
import { BlurView } from "expo-blur";

import { FullWindowOverlayWrapper } from "./FullWindowOverlayWrapper";

export interface FloatingContainerProps {
    position: {
        x?: number;
        y?: number;
    };
    visible?: boolean;
    align?: "top" | "bottom";
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const FloatingContainer = React.forwardRef<View, FloatingContainerProps>(
    ({ style, align = "top", position, visible = true, children }, ref) => {
        const styles = createStyles({ position });
        const colorScheme = useColorScheme();

        const uniqueKey = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);

        return (
            <Portal>
                <FullWindowOverlayWrapper key={`${uniqueKey}${visible}`}>
                    <BlurView
                        ref={ref}
                        intensity={1}
                        tint={colorScheme === "dark" ? "dark" : "light"}
                        style={[align === "top" ? styles.container : styles.containerInverse, style]}
                    >
                        {children}
                    </BlurView>
                </FullWindowOverlayWrapper>
            </Portal>
        );
    },
);

(FloatingContainer as React.FunctionComponent).displayName = "FloatingContainer";

const createStyles = ({ position: { x = 0, y = 0 } }: FloatingContainerProps) =>
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
    });
