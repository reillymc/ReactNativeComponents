import {
    type FC,
    type ReactElement,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Animated, Easing, PanResponder, StyleSheet, View } from "react-native";

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
    delay: 300,
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

    const [isInteracting, setInteracting] = useState(false);

    const panHandlers = useMemo(() => {
        const calculateRating = (x: number) => {
            if (!width) return value;

            return Math.max(
                0,
                Math.min(Math.round((x / width) * max * 2 + 0.2) / 2, max),
            );
        };

        const handleChange = (newRating: number) => {
            if (disabled || newRating === value) return;
            onChange?.(
                scale ? ratingToValue(newRating, max, scale) : newRating,
            );
        };

        if (disabled) return {};

        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e) => {
                const newRating = calculateRating(e.nativeEvent.locationX);
                handleChange(newRating);
            },
            onPanResponderStart: (e) => {
                const newRating = calculateRating(e.nativeEvent.locationX);
                handleChange(newRating);
                if (disabled) return;

                setInteracting(true);
            },
            onPanResponderEnd: (e) => {
                const newRating = calculateRating(e.nativeEvent.locationX);
                handleChange(newRating);

                setTimeout(() => {
                    setInteracting(false);
                }, animationConfig.delay);
            },
            onPanResponderTerminate: () => {
                // called when user drags outside of the component
                setTimeout(() => {
                    setInteracting(false);
                }, animationConfig.delay);
            },
        }).panHandlers;
    }, [value, max, width, disabled, scale, onChange]);

    return (
        <InputScaffold {...props}>
            <View
                style={styles.container}
                {...panHandlers}
                onLayout={(e) => {
                    const nextWidth = e.nativeEvent.layout.width;
                    if (nextWidth > 0) setWidth(nextWidth);
                }}
            >
                {ratingIcons.map((variant, i) => (
                    <AnimatedIcon
                        // biome-ignore lint/suspicious/noArrayIndexKey: index is the only available key
                        key={i}
                        active={
                            isInteracting &&
                            scaledRating > i &&
                            scaledRating - 1 <= i
                        }
                    >
                        <IconBase
                            {...icons[variant]}
                            style={{
                                size: ratingIconSize,
                                color: rating.icon.color[variant],
                            }}
                        />
                    </AnimatedIcon>
                ))}
            </View>
        </InputScaffold>
    );
};

type AnimatedIconProps = {
    active: boolean;
    children: ReactElement;
};

const AnimatedIcon: FC<AnimatedIconProps> = ({ active, children }) => {
    const { scale, easing, duration } = animationConfig;

    const [animatedSize] = useState(
        () => new Animated.Value(active ? scale : 1),
    );

    useEffect(() => {
        const animation = Animated.timing(animatedSize, {
            toValue: active ? scale : 1,
            useNativeDriver: true,
            easing,
            duration,
        });

        animation.start();
        return animation.stop;
    }, [active, animatedSize]);

    return (
        <Animated.View
            pointerEvents="none"
            style={{ transform: [{ scale: animatedSize }] }}
        >
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
            height: height[variant],
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
