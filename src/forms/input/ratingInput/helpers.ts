import { Easing } from "react-native-reanimated";

export const animationConfig = {
    easing: Easing.elastic(2),
    duration: 300,
    scale: 1.2,
};

export const calculateRating = (x: number, width: number, max: number) => {
    "worklet";

    if (!width) return 0;

    return Math.max(
        0,
        Math.min(Math.round((x / width) * max * 2 + 0.2) / 2, max),
    );
};

export const computeIconSize = (
    width: number | undefined,
    padding: number,
    height: number,
    max: number,
) => {
    if (!width || width <= 0) return 0;

    const maxSizeForWidth = Math.floor((width - padding * 2) / max);
    const maxSizeForHeight = height - padding * 2;

    return Math.max(0, Math.min(maxSizeForWidth, maxSizeForHeight));
};

export const KEYBOARD_STEP = 0.5;
