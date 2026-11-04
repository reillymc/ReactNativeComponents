import { useEffect, useRef } from "react";
import type { TextInputProps, ViewProps } from "react-native";
import { Platform } from "react-native";

import { useFocusVisible } from "../../internal";
import { useSystems } from "../../theme/useSystems";
import { useFieldContext } from "./FieldContext";
import { useFieldFocus } from "./FieldSurfaceContext";

type FieldFocusHandlerInput = Pick<
    TextInputProps,
    "onFocus" | "onBlur" | "onPressIn" | "onPressOut"
>;

type FieldFocusProps = ViewProps & TextInputProps;

type UseFieldControlFocusOptions = {
    focusable?: boolean;
    pressEvents?: boolean;
    focus?: () => void;
};

/**
 * Wires focus behavior for a control inside a Field.
 *
 * Tracks focus-visible, registers the control for imperative focus, and reports
 * focus to an enclosing FieldSurface (which owns the ring when nested). Returns
 * the focus-ring style and handlers to spread onto the control.
 */
export const useFieldControlFocus = ({
    focusable = true,
    pressEvents = false,
    focus,
}: UseFieldControlFocusOptions = {}) => {
    const { isNestedInSurface, reportFocusVisible } = useFieldFocus();
    const focusState = useFocusVisible(reportFocusVisible);
    const { getFocusRingStyle } = useSystems();

    useRegisterFieldControl(focusable ? focus : undefined);

    const focusRingStyle = getFocusRingStyle(
        Platform.OS === "web" &&
            focusable &&
            !isNestedInSurface &&
            focusState.focusVisible,
    );

    const getFocusProps = (
        handlers: FieldFocusHandlerInput = {},
    ): FieldFocusProps => ({
        ...(focusable ? focusState.webPointerHandlers : {}),
        onFocus: (event) => {
            if (focusable) focusState.onFocus();
            handlers.onFocus?.(event);
        },
        onBlur: (event) => {
            if (focusable) focusState.onBlur();
            handlers.onBlur?.(event);
        },
        ...(pressEvents
            ? {
                  onPressIn: (event) => {
                      if (focusable) focusState.onPointerDown();
                      handlers.onPressIn?.(event);
                  },
                  onPressOut: (event) => {
                      if (focusable) focusState.onPointerUp();
                      handlers.onPressOut?.(event);
                  },
              }
            : {}),
    });

    return {
        focusRingStyle,
        getFocusProps,
        isNestedInSurface,
    };
};

/**
 * Registers a control's focus callback with the enclosing Field.
 */
const useRegisterFieldControl = (focus: (() => void) | undefined) => {
    const field = useFieldContext();
    const registerControl = field?.registerControl;
    const focusable = focus !== undefined;
    const focusRef = useRef(focus);

    useEffect(() => {
        focusRef.current = focus;
    }, [focus]);

    useEffect(() => {
        if (!(registerControl && focusable)) {
            return;
        }

        return registerControl({
            focus: () => focusRef.current?.(),
        });
    }, [registerControl, focusable]);
};
