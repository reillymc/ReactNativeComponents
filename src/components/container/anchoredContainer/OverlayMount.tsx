import { type FC, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    type AnimatedRef,
    measure,
    useAnimatedStyle,
    useFrameCallback,
    useSharedValue,
} from "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";

import type { MountProps } from "./AnchoredContainer";
import { getContainerPlacement } from "./helpers";

export type OverlayMountProps = MountProps & {
    anchorRef: AnimatedRef<View>;
    margin: number;
};

export const OverlayMount: FC<OverlayMountProps> = ({
    anchorRef,
    geometry,
    margin,
    onLayout,
    containerStyle,
    children,
}) => {
    const anchorX = useSharedValue(0);
    const anchorY = useSharedValue(0);
    const anchorWidth = useSharedValue(0);
    const anchorHeight = useSharedValue(0);

    const trackAnchor = useCallback(() => {
        "worklet";

        const measured = measure(anchorRef);
        if (!measured) return;

        anchorX.value = measured.pageX;
        anchorY.value = measured.pageY;
        anchorWidth.value = measured.width;
        anchorHeight.value = measured.height;
    }, [anchorRef, anchorX, anchorY, anchorWidth, anchorHeight]);

    useFrameCallback(trackAnchor, true);

    const inverted = geometry?.inverted ?? false;
    const contentHeight = geometry?.contentHeight ?? 0;

    const overlayStyle = useAnimatedStyle(() => ({
        width: anchorWidth.value,
        opacity: anchorWidth.value > 0 && contentHeight > 0 ? 1 : 0,
        transform: [
            { translateX: anchorX.value },
            {
                translateY: inverted
                    ? anchorY.value - contentHeight - margin
                    : anchorY.value + anchorHeight.value + margin,
            },
        ],
    }));

    return (
        <FullWindowOverlay>
            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                <Animated.View
                    onLayout={onLayout}
                    pointerEvents="auto"
                    style={[
                        overlayStyles.container,
                        overlayStyle,
                        containerStyle,
                    ]}
                >
                    {typeof children === "function"
                        ? children(getContainerPlacement(geometry))
                        : children}
                </Animated.View>
            </View>
        </FullWindowOverlay>
    );
};

const overlayStyles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        top: 0,
    },
});
