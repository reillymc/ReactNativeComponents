import { type FC, type ReactNode, useRef, useState } from "react";
import {
    Pressable,
    type PressableProps,
    type StyleProp,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    createFocusRingStyle,
    type FocusRingTheme,
    useComponent,
} from "../shared";

export type ActionState = {
    pressed: boolean;
    hovered?: boolean;
};

export type ActionBaseTheme = {
    disabledOpacity: number;
    focusRing: Required<FocusRingTheme>;
};

export interface ActionBaseProps extends Pick<PressableProps, "hitSlop"> {
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    highlighted?: boolean;
    onPress?: () => void;
    theme?: DeepPartial<ActionBaseTheme>;
    children?: ReactNode | ((state: ActionState) => ReactNode);
}

export const ActionBase: FC<ActionBaseProps> = ({
    disabled,
    highlighted,
    style,
    hitSlop = 16,
    children,
    onPress,
    theme: themeOverrides,
}) => {
    const { theme } = useComponent("actionBase", { themeOverrides });
    const [hovered, setHovered] = useState(false);
    const [focusVisible, setFocusVisible] = useState(false);
    const pointerDownRef = useRef(false);
    const isDisabled = disabled || !onPress;

    const handleBlur = () => {
        pointerDownRef.current = false;
        setFocusVisible(false);
    };

    const handleFocus = () => {
        setFocusVisible(!pointerDownRef.current);
    };

    const handlePointerDown = () => {
        pointerDownRef.current = true;
        setFocusVisible(false);
    };

    const handlePointerUp = () => {
        pointerDownRef.current = false;
    };

    return (
        <Pressable
            hitSlop={hitSlop}
            disabled={isDisabled}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPress={onPress}
            style={[
                createFocusRingStyle(
                    theme.focusRing,
                    !isDisabled && focusVisible,
                ),
                disabled && { opacity: theme.disabledOpacity },
                { overflow: "hidden" },
                style,
            ]}
        >
            {(state) =>
                typeof children === "function"
                    ? children({
                          ...state,
                          hovered: !isDisabled && (hovered || highlighted),
                      })
                    : children
            }
        </Pressable>
    );
};
