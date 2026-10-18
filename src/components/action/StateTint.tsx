import type { FC, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { useTheme } from "../../hooks";
import type { ActionState } from "./ActionBase";

export type StateTintStyles = {
    hoverOpacity: number;
    pressedOpacity: number;
};

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
    const {
        styles: { stateTint },
    } = useTheme();

    const { hoverOpacity, pressedOpacity } = stateTint;
    const target = pressed ? pressedOpacity : hovered ? hoverOpacity : 1;
    const duration = pressed ? 25 : 250;

    const animatedStyle = useAnimatedStyle(
        () => ({ opacity: withTiming(target, { duration }) }),
        [target, duration],
    );

    return (
        <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    );
};
