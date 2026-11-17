import { useCallback, useRef, useState } from "react";

import type { ContextMenuPosition } from "./ContextMenu";

const KEYBOARD_OFFSET = 8;
const MENU_GAP = 4;

type ContextMenuTriggerEvent = {
    preventDefault?: () => void;
    stopPropagation?: () => void;
    clientX?: number;
    clientY?: number;
    key?: string;
    shiftKey?: boolean;
    target?: unknown;
    currentTarget?: unknown;
};

export interface ContextMenuRootProps {
    tabIndex?: 0 | -1;
    "aria-haspopup"?: "menu";
    "aria-expanded"?: boolean;
    onContextMenu?: (event: ContextMenuTriggerEvent) => void;
    onKeyDown?: (event: ContextMenuTriggerEvent) => void;
}

type UseContextMenuTriggerOptions = {
    hasActions: boolean;
    tabIndex?: 0 | -1;
};

type UseContextMenuTriggerResult = {
    rootProps: ContextMenuRootProps;
    position: ContextMenuPosition | undefined;
    dismiss: (restoreFocus?: boolean) => void;
};

const getElement = (value: unknown): HTMLElement | null =>
    typeof HTMLElement !== "undefined" && value instanceof HTMLElement
        ? value
        : null;

const resolveTrigger = (event: ContextMenuTriggerEvent) =>
    getElement(event.target)?.closest<HTMLElement>("[tabindex]") ??
    getElement(event.currentTarget);

export const useContextMenuTrigger = ({
    hasActions,
    tabIndex = -1,
}: UseContextMenuTriggerOptions): UseContextMenuTriggerResult => {
    const activeTriggerRef = useRef<HTMLElement | null>(null);
    const [position, setPosition] = useState<ContextMenuPosition>();

    const dismiss = useCallback((restoreFocus = false) => {
        setPosition(undefined);

        if (restoreFocus) {
            activeTriggerRef.current?.focus();
        }

        activeTriggerRef.current = null;
    }, []);

    const handleContextMenu = useCallback(
        (event: ContextMenuTriggerEvent) => {
            if (!hasActions) return;

            event.preventDefault?.();
            event.stopPropagation?.();

            activeTriggerRef.current = resolveTrigger(event);

            setPosition({
                x: event.clientX ?? 0,
                y: event.clientY ?? 0,
            });
        },
        [hasActions],
    );

    const handleKeyDown = useCallback(
        (event: ContextMenuTriggerEvent) => {
            if (!hasActions) return;

            const key = event.key;
            const shiftKey = event.shiftKey ?? false;
            const isContextMenuKey = key === "ContextMenu" || key === "Apps";
            const isShiftF10 = shiftKey && key === "F10";

            if (!(isContextMenuKey || isShiftF10)) return;

            event.preventDefault?.();
            event.stopPropagation?.();

            activeTriggerRef.current = resolveTrigger(event);

            const rect = getElement(
                event.currentTarget,
            )?.getBoundingClientRect();

            setPosition({
                x: (rect?.left ?? 0) + KEYBOARD_OFFSET,
                y: (rect?.bottom ?? 0) + MENU_GAP,
            });
        },
        [hasActions],
    );

    return {
        rootProps: hasActions
            ? {
                  tabIndex,
                  "aria-haspopup": "menu",
                  "aria-expanded": position !== undefined,
                  onContextMenu: handleContextMenu,
                  onKeyDown: handleKeyDown,
              }
            : {},
        position,
        dismiss,
    };
};
