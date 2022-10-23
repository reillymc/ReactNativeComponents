import { Portal } from "@gorhom/portal";
import React from "react";
import { View, ViewStyle } from "react-native";

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

const FloatingContainer = React.forwardRef<View, FloatingContainerProps>(
    ({ style, position: { x = 0, y = 0, offsetX = 0, offsetY = 0 }, children }, ref) => {
        return (
            <Portal>
                <View
                    ref={ref}
                    style={[
                        {
                            marginTop: 5,
                            position: "absolute",
                            top: y + offsetY,
                            left: x + offsetX,
                        },
                        style,
                    ]}
                >
                    {children}
                </View>
            </Portal>
        );
    },
);

FloatingContainer.displayName = "FloatingContainer";

export { FloatingContainer };
