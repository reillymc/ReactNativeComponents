import {
    type FC,
    type ReactElement,
    useEffect,
    useEffectEvent,
    useMemo,
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
    getRatingIcons,
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

    const [width, setWidth] = useState<number>();

    const widthShared = useSharedValue(0);
    const activeIndex = useSharedValue(-1);
    const interacting = useSharedValue(0);

    useEffect(() => {
        widthShared.value = width ?? 0;
    }, [width, widthShared]);

    const commitRating = useEffectEvent((nextRating: number) => {
        if (disabled || nextRating === value) return;

        onChange?.(scale ? ratingToValue(nextRating, max, scale) : nextRating);
    });

    const pan = useMemo(
        () =>
            Gesture.Pan()
                .enabled(!disabled)
                .onBegin((e) => {
                    const nextRating = calculateRating(
                        e.x,
                        widthShared.value,
                        max,
                    );
                    interacting.value = 1;
                    activeIndex.value = Math.ceil(nextRating) - 1;
                    scheduleOnRN(commitRating, nextRating);
                })
                .onUpdate((e) => {
                    const nextRating = calculateRating(
                        e.x,
                        widthShared.value,
                        max,
                    );
                    activeIndex.value = Math.ceil(nextRating) - 1;
                    scheduleOnRN(commitRating, nextRating);
                })
                .onEnd((e) => {
                    const nextRating = calculateRating(
                        e.x,
                        widthShared.value,
                        max,
                    );
                    activeIndex.value = Math.ceil(nextRating) - 1;
                    scheduleOnRN(commitRating, nextRating);
                })
                .onFinalize(() => {
                    interacting.value = 0;
                }),
        [disabled, max, widthShared, activeIndex, interacting],
    );

    const ratingIconSize = useMemo(() => {
        if (!width || width <= 0) return 0;

        const maxSizeForWidth = Math.floor(
            (width -
                inputBase.container.padding -
                theme.spacing.tiny * (max - 1)) /
                max,
        );

        const maxSizeForHeight =
            inputBase.container.height[variant] -
            inputBase.container.padding -
            theme.spacing.tiny * 2;

        return Math.max(0, Math.min(maxSizeForWidth, maxSizeForHeight));
    }, [
        width,
        inputBase.container.padding,
        theme.spacing.tiny,
        inputBase.container.height,
        max,
        variant,
    ]);

    const scaledRating = scale ? valueToRating(value, max, scale) : value;
    const ratingIcons = getRatingIcons(scaledRating, max);

    return (
        <InputScaffold {...props}>
            <GestureDetector gesture={pan}>
                <View
                    style={styles.container}
                    onLayout={(e) => {
                        const nextWidth = e.nativeEvent.layout.width;
                        if (nextWidth > 0) setWidth(nextWidth);
                    }}
                >
                    {ratingIcons.map((ratingVariant, i) => (
                        <AnimatedIcon
                            // biome-ignore lint/suspicious/noArrayIndexKey: index is the only available key
                            key={i}
                            index={i}
                            activeIndex={activeIndex}
                            interacting={interacting}
                        >
                            <IconBase
                                {...icons[ratingVariant]}
                                size={ratingIconSize}
                                color={rating.icon.color[ratingVariant]}
                            />
                        </AnimatedIcon>
                    ))}
                </View>
            </GestureDetector>
        </InputScaffold>
    );
};

type AnimatedIconProps = {
    index: number;
    activeIndex: SharedValue<number>;
    interacting: SharedValue<number>;
    children: ReactElement;
};

const AnimatedIcon: FC<AnimatedIconProps> = ({
    index,
    activeIndex,
    interacting,
    children,
}) => {
    const animatedStyle = useAnimatedStyle(() => {
        const active = interacting.value === 1 && activeIndex.value === index;

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
        <Animated.View pointerEvents="none" style={animatedStyle}>
            {children}
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
