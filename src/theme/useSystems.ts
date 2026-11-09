import { Platform, type ViewStyle } from "react-native";

import type {
    FocusRingTheme,
    ShadowValues,
    StateValues,
    Systems,
} from "./systems";
import { useThemeContext } from "./useTheme";

type FocusRingStyle = {
    outlineColor: string;
    outlineStyle: "solid";
    outlineWidth: number;
    outlineOffset?: number;
    position?: "relative";
    zIndex?: number;
};

type DisabledStyle = {
    opacity: number;
};

const createShadowStyle = ({
    color,
    offset,
    opacity,
    radius,
    elevation,
}: ShadowValues): ViewStyle => {
    if (Platform.OS === "web") {
        const shadowColor = typeof color === "string" ? color : "black";

        return {
            boxShadow: `${offset.width}px ${offset.height}px ${radius}px color-mix(in srgb, ${shadowColor} ${opacity * 100}%, transparent)`,
        };
    }

    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation,
    };
};

const createFocusRingStyle = (
    { color, width, offset }: FocusRingTheme,
    visible: boolean,
): FocusRingStyle =>
    visible
        ? {
              outlineColor: color,
              outlineOffset: offset,
              outlineStyle: "solid",
              outlineWidth: width,
              position: "relative",
              zIndex: 1,
          }
        : {
              outlineColor: "transparent",
              outlineStyle: "solid",
              outlineWidth: 0,
          };

const createDisabledStyle = (opacity: number): DisabledStyle => ({ opacity });

export type UseSystemsResult = {
    getFocusRingStyle: (visible: boolean) => FocusRingStyle;
    getDisabledStyle: (disabled: boolean) => DisabledStyle | undefined;
    shadowStyle: ViewStyle;
    state: StateValues;
    maxFontSizeMultiplier: number;
    hitSlop: Systems["touch"]["hitSlop"];
};

export const useSystems = (): UseSystemsResult => {
    const { systems } = useThemeContext();
    const { focusRing, disabled, state } = systems.interaction;

    const visibleFocusRingStyle = createFocusRingStyle(focusRing, true);
    const hiddenFocusRingStyle = createFocusRingStyle(focusRing, false);
    const disabledStyle = createDisabledStyle(disabled.opacity);
    const shadowStyle = createShadowStyle(systems.shadow);

    return {
        getFocusRingStyle: (visible: boolean) =>
            visible ? visibleFocusRingStyle : hiddenFocusRingStyle,
        getDisabledStyle: (isDisabled: boolean) =>
            isDisabled ? disabledStyle : undefined,
        shadowStyle,
        state,
        maxFontSizeMultiplier: systems.accessibility.maxFontSizeMultiplier,
        hitSlop: systems.touch.hitSlop,
    };
};
