import { useCallback, useEffect, useRef, useState } from "react";
import type { View } from "react-native";

import type { ContextMenuDismissReason } from "./ContextMenu.web";

const KEYBOARD_OFFSET = 8;
const MENU_GAP = 4;

export type ContextMenuAnchor = {
    x: number;
    y: number;
    openedWithKeyboard: boolean;
};

type UseContextMenuTriggerOptions = {
    hasActions: boolean;
};

export const useContextMenuTrigger = ({
    hasActions,
}: UseContextMenuTriggerOptions) => {
    const containerRef = useRef<View>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    const [menuAnchor, setMenuAnchor] = useState<ContextMenuAnchor>();

    const closeMenu = useCallback((restoreFocus: boolean) => {
        setMenuAnchor(undefined);

        if (restoreFocus) {
            (
                triggerRef.current ??
                (containerRef.current as HTMLElement | null)
            )?.focus();
        }

        triggerRef.current = null;
    }, []);

    const handleDismiss = useCallback(
        (reason: ContextMenuDismissReason) => {
            closeMenu(reason === "escape" || reason === "tab");
        },
        [closeMenu],
    );

    useEffect(() => {
        if (!hasActions) {
            setMenuAnchor(undefined);
            return;
        }

        const node = containerRef.current as HTMLElement | null;
        if (!node) return;

        // Keep the wrapper as a programmatic focus fallback, not a tab stop.
        node.tabIndex = -1;

        const resolveTrigger = (target: EventTarget | null) => {
            if (target instanceof HTMLElement) {
                return target.closest<HTMLElement>("[tabindex]") ?? node;
            }

            return node;
        };

        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            triggerRef.current = resolveTrigger(event.target);
            setMenuAnchor({
                x: event.clientX,
                y: event.clientY,
                openedWithKeyboard: false,
            });
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const isContextMenuKey =
                event.key === "ContextMenu" || event.key === "Apps";
            const isShiftF10 = event.shiftKey && event.key === "F10";

            if (!(isContextMenuKey || isShiftF10)) return;

            event.preventDefault();
            triggerRef.current = resolveTrigger(event.target);
            const rect = node.getBoundingClientRect();
            setMenuAnchor({
                x: rect.left + KEYBOARD_OFFSET,
                y: rect.bottom + MENU_GAP,
                openedWithKeyboard: true,
            });
        };

        node.addEventListener("contextmenu", handleContextMenu);
        node.addEventListener("keydown", handleKeyDown);

        return () => {
            node.removeEventListener("contextmenu", handleContextMenu);
            node.removeEventListener("keydown", handleKeyDown);
        };
    }, [hasActions]);

    return { containerRef, menuAnchor, handleDismiss };
};
