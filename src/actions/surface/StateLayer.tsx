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

import { defineStyles, useComponent } from "../../internal";
import { useSystems } from "../../theme/useSystems";
import type { ActionState } from "../action";

export type StateLayerTheme = {
    color: ColorValue;
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
    const { styles } = useComponent("stateLayer", {
        themeOverrides,
        createStyles,
    });
    const { state } = useSystems();

    const target = pressed
        ? state.pressedOpacity
        : hovered
          ? state.hoverOpacity
          : 0;
    const duration = pressed ? state.pressDuration : state.hoverDuration;

    const animatedStyle = useAnimatedStyle(
        () => ({ opacity: withTiming(target, { duration }) }),
        [target, duration],
    );

    return <Animated.View style={[styles.layer, animatedStyle, style]} />;
};

const createStyles = defineStyles((theme: StateLayerTheme) => ({
    layer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: theme.color,
        pointerEvents: "none",
    },
}));
