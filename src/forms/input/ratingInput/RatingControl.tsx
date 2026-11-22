import { type FC, useEffect, useEffectEvent, useRef, useState } from "react";
import { Platform, StyleSheet, View, type ViewInstance } from "react-native";
import {
    GestureDetector,
    useExclusiveGestures,
    usePanGesture,
    useTapGesture,
} from "react-native-gesture-handler";
import {
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import type { DeepPartial } from "@reillymc/es-utils";

import { ratingToValue, valueToRating } from "../../../display/rating";
import { IconBase } from "../../../icons/IconBase";
import { useComponent } from "../../../internal";
import {
    fieldAria,
    useFieldControlFocus,
    useFieldControlState,
} from "../../field";
import { AnimatedStar } from "./AnimatedStar";
import {
    animationConfig,
    calculateRating,
    computeIconSize,
    KEYBOARD_STEP,
} from "./helpers";
import type { RatingInputTheme } from "./RatingInput.theme";

type RatingKeyEvent = {
    key?: string;
    nativeEvent?: { key?: string };
    preventDefault?: () => void;
};

type RatingControlProps = {
    max: number;
    onChange?: (value: number) => void;
    scale?: number;
    themeOverrides?: DeepPartial<RatingInputTheme>;
    value: number;
};

export const RatingControl: FC<RatingControlProps> = ({
    max,
    onChange,
    scale,
    themeOverrides,
    value,
}) => {
    const { field, interactive, variant } = useFieldControlState();
    const { theme, icons } = useComponent("ratingInput", { themeOverrides });
    const { theme: fieldTheme } = useComponent("field");
    const canChange = interactive && !!onChange;

    const controlRef = useRef<ViewInstance>(null);
    const focusControl = () => {
        controlRef.current?.focus();
    };
    const fieldFocus = useFieldControlFocus({
        focusable: canChange,
        focus: focusControl,
    });

    const scaledRating = scale ? valueToRating(value, max, scale) : value;
    const [width, setWidth] = useState<number>();

    const widthShared = useSharedValue(0);
    const ratingShared = useSharedValue(scaledRating);
    const interacting = useSharedValue(0);

    useEffect(() => {
        ratingShared.set(scaledRating);
    }, [scaledRating, ratingShared]);

    const commitRating = useEffectEvent((nextRating: number) => {
        if (!canChange || nextRating === scaledRating) return;

        onChange?.(scale ? ratingToValue(nextRating, max, scale) : nextRating);
    });

    const setRating = (nextRating: number) => {
        if (!canChange) return;

        const next = Math.max(0, Math.min(max, nextRating));

        if (next === ratingShared.get()) return;

        ratingShared.set(next);
        interacting.set(
            withSequence(
                withTiming(1, { duration: 0 }),
                withDelay(
                    animationConfig.duration,
                    withTiming(0, { duration: 0 }),
                ),
            ),
        );
        commitRating(next);
    };

    const pan = usePanGesture({
        enabled: canChange,
        onBegin: (e) => {
            interacting.set(1);
            ratingShared.set(calculateRating(e.x, widthShared.value, max));
        },
        onUpdate: (e) => {
            ratingShared.set(calculateRating(e.x, widthShared.value, max));
        },
        onDeactivate: (e) => {
            const nextRating = calculateRating(e.x, widthShared.value, max);
            ratingShared.set(nextRating);
            scheduleOnRN(commitRating, nextRating);
        },
        onFinalize: () => {
            interacting.set(0);
        },
    });

    const tap = useTapGesture({
        enabled: canChange,
        onDeactivate: (e) => {
            scheduleOnRN(
                commitRating,
                calculateRating(e.x, widthShared.value, max),
            );
        },
    });

    const gesture = useExclusiveGestures(pan, tap);

    const ratingIconSize = computeIconSize(
        width,
        fieldTheme.surface.padding,
        fieldTheme.surface.minHeight[variant],
        max,
    );

    const handleKeyDown = (event: RatingKeyEvent) => {
        const key = event.nativeEvent?.key ?? event.key;
        let nextRating: number | undefined;

        switch (key) {
            case "ArrowRight":
            case "ArrowUp":
                nextRating = ratingShared.get() + KEYBOARD_STEP;
                break;
            case "ArrowLeft":
            case "ArrowDown":
                nextRating = ratingShared.get() - KEYBOARD_STEP;
                break;
            case "Home":
                nextRating = 0;
                break;
            case "End":
                nextRating = max;
                break;
        }

        if (nextRating === undefined) return;

        event.preventDefault?.();
        setRating(nextRating);
    };

    const webKeyboardHandlers =
        Platform.OS === "web" && canChange ? { onKeyDown: handleKeyDown } : {};

    return (
        <GestureDetector gesture={gesture}>
            <View
                ref={controlRef}
                {...fieldFocus.getFocusProps()}
                {...webKeyboardHandlers}
                accessible
                accessibilityActions={[
                    { label: "Increase rating", name: "increment" },
                    { label: "Decrease rating", name: "decrement" },
                ]}
                {...fieldAria(field, {
                    value: { min: 0, max, now: scaledRating },
                })}
                focusable={canChange}
                onAccessibilityAction={(event) => {
                    switch (event.nativeEvent.actionName) {
                        case "increment":
                            setRating(ratingShared.get() + KEYBOARD_STEP);
                            break;
                        case "decrement":
                            setRating(ratingShared.get() - KEYBOARD_STEP);
                            break;
                    }
                }}
                onLayout={(e) => {
                    const nextWidth = e.nativeEvent.layout.width;
                    if (nextWidth > 0) {
                        setWidth(nextWidth);
                        widthShared.set(nextWidth);
                    }
                }}
                role="slider"
                style={[
                    styles.container,
                    { padding: fieldTheme.surface.padding },
                    fieldFocus.focusRingStyle,
                ]}
                tabIndex={canChange ? 0 : -1}
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
                                color={theme.icon.color.empty}
                            />
                        }
                        half={
                            <IconBase
                                {...icons.half}
                                size={ratingIconSize}
                                color={theme.icon.color.half}
                            />
                        }
                        full={
                            <IconBase
                                {...icons.full}
                                size={ratingIconSize}
                                color={theme.icon.color.full}
                            />
                        }
                    />
                ))}
            </View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});
