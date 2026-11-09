import type { FC } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
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
    style?: StyleProp<ViewStyle>;
};

export const OverlayMount: FC<OverlayMountProps> = ({
    anchorRef,
    geometry,
    margin,
    onLayout,
    style,
    children,
}) => {
    const anchorX = useSharedValue(0);
    const anchorY = useSharedValue(0);
    const anchorWidth = useSharedValue(0);
    const anchorHeight = useSharedValue(0);

    const trackAnchor = () => {
        "worklet";

        const measured = measure(anchorRef);
        if (!measured) return;

        anchorX.set(measured.pageX);
        anchorY.set(measured.pageY);
        anchorWidth.set(measured.width);
        anchorHeight.set(measured.height);
    };

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
            <View style={overlayStyles.backdrop}>
                <Animated.View
                    onLayout={onLayout}
                    style={[overlayStyles.container, overlayStyle, style]}
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
    backdrop: {
        ...StyleSheet.absoluteFill,
        pointerEvents: "box-none",
    },
    container: {
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "auto",
    },
});
