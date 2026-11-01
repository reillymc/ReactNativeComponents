import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

type FocusIntent = "pointer" | "keyboard";

const isWeb = Platform.OS === "web";

let focusIntent: FocusIntent | null = null;
let nextFocusVisibleOverride: boolean | undefined;
let installed = false;

const clearFocusVisibleOverride = () => {
    nextFocusVisibleOverride = undefined;
};

const installFocusModalityTracking = () => {
    if (installed || !isWeb || typeof document === "undefined") {
        return;
    }

    installed = true;

    const handlePointerDown = () => {
        focusIntent = "pointer";
        clearFocusVisibleOverride();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;

        focusIntent = "keyboard";
        clearFocusVisibleOverride();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);
};

const isKeyboardFocusIntent = () => focusIntent === "keyboard";

const overrideNextFocusVisible = (visible: boolean) => {
    nextFocusVisibleOverride = visible;
};

const consumeFocusVisibleOverride = () => {
    const override = nextFocusVisibleOverride;
    nextFocusVisibleOverride = undefined;

    if (override !== undefined) {
        focusIntent = override ? "keyboard" : "pointer";
    }

    return override;
};

/**
 * Focuses a node without changing the current focus ring state. Used for
 * deliberate programmatic focus such as segmented input navigation.
 */
export const focusPreservingFocusVisible = (
    node: { focus: () => void } | null,
) => {
    if (!node) return;

    const visible = isKeyboardFocusIntent();

    overrideNextFocusVisible(visible);
    node.focus();

    queueMicrotask(() => {
        if (nextFocusVisibleOverride === visible) {
            nextFocusVisibleOverride = undefined;
        }
    });
};

/**
 * Tracks focus-visible state for the current focus modality. On web, pointer
 * interaction hides the ring and Tab navigation shows it. Programmatic focus
 * preserves the current state until Tab restores normal ring behavior.
 */
export const useFocusVisible = (
    onFocusVisibleChange?: (focusVisible: boolean) => void,
) => {
    const focusedRef = useRef(false);
    const pointerDownRef = useRef(false);
    const [focusVisible, setFocusVisible] = useState(false);

    useEffect(installFocusModalityTracking, []);

    const onFocus = () => {
        focusedRef.current = true;

        const override = consumeFocusVisibleOverride();
        const nextFocusVisible =
            override ??
            (isWeb
                ? !pointerDownRef.current && isKeyboardFocusIntent()
                : !pointerDownRef.current);

        setFocusVisible(nextFocusVisible);
        onFocusVisibleChange?.(nextFocusVisible);
    };

    const onBlur = () => {
        focusedRef.current = false;
        pointerDownRef.current = false;
        setFocusVisible(false);
        onFocusVisibleChange?.(false);
    };

    const onPointerDown = () => {
        pointerDownRef.current = true;

        if (focusedRef.current) {
            setFocusVisible(false);
            onFocusVisibleChange?.(false);
        }
    };

    const onPointerUp = () => {
        pointerDownRef.current = false;
    };

    const webPointerHandlers = isWeb
        ? {
              onPointerDown,
              onPointerUp,
              onPointerCancel: onPointerUp,
          }
        : {};

    return {
        focusVisible,
        onFocus,
        onBlur,
        onPointerDown,
        onPointerUp,
        onPointerCancel: onPointerUp,
        webPointerHandlers,
    };
};
