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
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../internal";
import type { ActionState } from "../action";

export type StateLayerTheme = {
    color: ColorValue;
    hoverOpacity: number;
    pressedOpacity: number;
};

export interface StateLayerProps extends ActionState {
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<StateLayerTheme>;
}

export const StateLayer: FC<StateLayerProps> = ({
    pressed,
    hovered,
    style,
    theme: themeOverrides,
}) => {
    const { theme } = useComponent("stateLayer", { themeOverrides });

    const target = pressed
        ? theme.pressedOpacity
        : hovered
          ? theme.hoverOpacity
          : 0;
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
                { backgroundColor: theme.color },
                animatedStyle,
                style,
            ]}
        />
    );
};
