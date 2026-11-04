import type { FC, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { useSystems } from "../../theme/useSystems";
import type { ActionState } from "./ActionBase";

export interface StateTintProps extends ActionState {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

export const StateTint: FC<StateTintProps> = ({
    pressed,
    hovered,
    style,
    children,
}) => {
    const { state } = useSystems();

    const target = pressed
        ? 1 - state.pressedOpacity
        : hovered
          ? 1 - state.hoverOpacity
          : 1;
    const duration = pressed ? state.pressDuration : state.hoverDuration;

    const animatedStyle = useAnimatedStyle(
        () => ({ opacity: withTiming(target, { duration }) }),
        [target, duration],
    );

    return (
        <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    );
};
