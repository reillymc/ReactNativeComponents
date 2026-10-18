import {
    type FC,
    type ReactElement,
    useEffect,
    useEffectEvent,
    useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    Easing,
    type SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { IconBase } from "../icon";
import {
    type RatingIconVariant,
    type RatingProps,
    ratingToValue,
    valueToRating,
} from "../rating";
import type { InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";

export type RatingInputStyles = null;

export type RatingInputIcons = ComponentIconAssets<RatingIconVariant>;

export interface RatingInputProps
    extends InputScaffoldFieldProps,
        Pick<InputBaseProps, "disabled" | "variant">,
        Pick<RatingProps, "max" | "value" | "scale"> {
    /**
     * Change listener that gets called when rating changes.
     */
    onChange?: (value: number) => void;
}

const animationConfig = {
    easing: Easing.elastic(2),
    duration: 300,
    scale: 1.2,
};

const calculateRating = (x: number, width: number, max: number) => {
    "worklet";

    if (!width) return 0;

    return Math.max(
        0,
        Math.min(Math.round((x / width) * max * 2 + 0.2) / 2, max),
    );
};

const computeIconSize = (
    width: number | undefined,
    padding: number,
    gap: number,
    height: number,
    max: number,
) => {
    if (!width || width <= 0) return 0;

    const maxSizeForWidth = Math.floor(
        (width - padding - gap * (max - 1)) / max,
    );
    const maxSizeForHeight = height - padding - gap * 2;

    return Math.max(0, Math.min(maxSizeForWidth, maxSizeForHeight));
};

export const RatingInput: FC<RatingInputProps> = ({
    value = 0,
    max = 5,
    disabled: disabledProp,
    variant = "regular",
    scale,
    onChange,
    ...props
}) => {
    const disabled = disabledProp || !onChange;

    const {
        theme,
        styles: { inputBase, rating },
    } = useTheme();

    const [styles, { icons }] = useThemedStyles("ratingInput", createStyles, {
        props: { disabled, variant },
    });

    const scaledRating = scale ? valueToRating(value, max, scale) : value;

    const [width, setWidth] = useState<number>();

    const widthShared = useSharedValue(0);
    const ratingShared = useSharedValue(scaledRating);
    const interacting = useSharedValue(0);

    useEffect(() => {
        ratingShared.value = scaledRating;
    }, [scaledRating, ratingShared]);

    const commitRating = useEffectEvent((nextRating: number) => {
        if (disabled || nextRating === scaledRating) return;

        onChange?.(scale ? ratingToValue(nextRating, max, scale) : nextRating);
    });

    const pan = Gesture.Pan()
        .enabled(!disabled)
        .onBegin((e) => {
            interacting.value = 1;
            ratingShared.value = calculateRating(e.x, widthShared.value, max);
        })
        .onUpdate((e) => {
            ratingShared.value = calculateRating(e.x, widthShared.value, max);
        })
        .onEnd((e) => {
            const nextRating = calculateRating(e.x, widthShared.value, max);
            ratingShared.value = nextRating;
            scheduleOnRN(commitRating, nextRating);
        })
        .onFinalize(() => {
            interacting.value = 0;
        });

    const tap = Gesture.Tap().onEnd((e) => {
        scheduleOnRN(
            commitRating,
            calculateRating(e.x, widthShared.value, max),
        );
    });

    const gesture = Gesture.Exclusive(pan, tap);

    const ratingIconSize = computeIconSize(
        width,
        inputBase.container.padding,
        theme.spacing.tiny,
        inputBase.container.height[variant],
        max,
    );

    return (
        <InputScaffold {...props}>
            <GestureDetector gesture={gesture}>
                <View
                    style={styles.container}
                    onLayout={(e) => {
                        const nextWidth = e.nativeEvent.layout.width;
                        if (nextWidth > 0) {
                            setWidth(nextWidth);
                            widthShared.value = nextWidth;
                        }
                    }}
                >
                    {Array.from({ length: max }, (_, index) => (
                        <AnimatedStar
                            // biome-ignore lint/suspicious/noArrayIndexKey: index is the only available key
                            key={index}
                            index={index}
                            rating={ratingShared}
                            size={ratingIconSize}
                            interacting={interacting}
                            empty={
                                <IconBase
                                    {...icons.empty}
                                    size={ratingIconSize}
                                    color={rating.icon.color.empty}
                                />
                            }
                            half={
                                <IconBase
                                    {...icons.half}
                                    size={ratingIconSize}
                                    color={rating.icon.color.half}
                                />
                            }
                            full={
                                <IconBase
                                    {...icons.full}
                                    size={ratingIconSize}
                                    color={rating.icon.color.full}
                                />
                            }
                        />
                    ))}
                </View>
            </GestureDetector>
        </InputScaffold>
    );
};

type AnimatedStarProps = {
    index: number;
    rating: SharedValue<number>;
    size: number;
    interacting: SharedValue<number>;
    empty: ReactElement;
    half: ReactElement;
    full: ReactElement;
};

const AnimatedStar: FC<AnimatedStarProps> = ({
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
            style={[
                {
                    width: size,
                    height: size,
                    pointerEvents: "none",
                },
                scaleStyle,
            ]}
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

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    {
        disabled,
        variant,
    }: Required<Pick<RatingInputProps, "disabled" | "variant">>,
) => {
    const { borderRadius, padding, height } = inputBase.container;

    return StyleSheet.create({
        container: {
            minHeight: height[variant],
            borderRadius,
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
            padding,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
        },
    });
};
