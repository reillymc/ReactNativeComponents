import type { FC, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    type SharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { animationConfig } from "./helpers";

type AnimatedStarProps = {
    index: number;
    rating: SharedValue<number>;
    size: number;
    interacting: SharedValue<number>;
    empty: ReactElement;
    half: ReactElement;
    full: ReactElement;
};

export const AnimatedStar: FC<AnimatedStarProps> = ({
    index,
    rating,
    size,
    interacting,
    empty,
    half,
    full,
}) => {
    const emptyStyle = useAnimatedStyle(() => ({
        opacity: rating.value >= index + 0.5 ? 0 : 1,
    }));
    const halfStyle = useAnimatedStyle(() => ({
        opacity:
            rating.value >= index + 0.5 && rating.value < index + 1 ? 1 : 0,
    }));
    const fullStyle = useAnimatedStyle(() => ({
        opacity: rating.value >= index + 1 ? 1 : 0,
    }));
    const scaleStyle = useAnimatedStyle(() => {
        const active =
            interacting.value === 1 && Math.ceil(rating.value) - 1 === index;

        return {
            transform: [
                {
                    scale: withTiming(active ? animationConfig.scale : 1, {
                        duration: animationConfig.duration,
                        easing: animationConfig.easing,
                    }),
                },
            ],
        };
    });

    return (
        <Animated.View
            style={[{ width: size, height: size }, styles.star, scaleStyle]}
        >
            <Animated.View style={[StyleSheet.absoluteFill, emptyStyle]}>
                {empty}
            </Animated.View>
            <Animated.View style={[StyleSheet.absoluteFill, halfStyle]}>
                {half}
            </Animated.View>
            <Animated.View style={[StyleSheet.absoluteFill, fullStyle]}>
                {full}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    star: {
        pointerEvents: "none",
    },
});
