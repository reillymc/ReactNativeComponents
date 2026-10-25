import type { FC, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../shared";
import type { ActionState } from "./ActionBase";

export type StateTintTheme = {
    hoverOpacity: number;
    pressedOpacity: number;
};

export interface StateTintProps extends ActionState {
    style?: StyleProp<ViewStyle>;
    theme?: DeepPartial<StateTintTheme>;
    children?: ReactNode;
}

export const StateTint: FC<StateTintProps> = ({
    pressed,
    hovered,
    style,
    theme: themeOverrides,
    children,
}) => {
    const { theme } = useComponent("stateTint", { themeOverrides });

    const target = pressed
        ? theme.pressedOpacity
        : hovered
          ? theme.hoverOpacity
          : 1;
    const duration = pressed ? 25 : 250;

    const animatedStyle = useAnimatedStyle(
        () => ({ opacity: withTiming(target, { duration }) }),
        [target, duration],
    );

    return (
        <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    );
};
