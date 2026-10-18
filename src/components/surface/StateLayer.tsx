import type { FC } from "react";
import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    type ViewStyle,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { useTheme } from "../../hooks";
import type { ActionState } from "../action";

export type StateLayerStyles = {
    color: ColorValue;
    hoverOpacity: number;
    pressedOpacity: number;
};

export interface StateLayerProps extends ActionState {
    style?: StyleProp<ViewStyle>;
}

export const StateLayer: FC<StateLayerProps> = ({
    pressed,
    hovered,
    style,
}) => {
    const {
        styles: { stateLayer },
    } = useTheme();

    const { color, hoverOpacity, pressedOpacity } = stateLayer;
    const target = pressed ? pressedOpacity : hovered ? hoverOpacity : 0;
    const duration = pressed ? 50 : 100;

    const animatedStyle = useAnimatedStyle(
        () => ({ opacity: withTiming(target, { duration }) }),
        [target, duration],
    );

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                StyleSheet.absoluteFill,
                { backgroundColor: color },
                animatedStyle,
                style,
            ]}
        />
    );
};
