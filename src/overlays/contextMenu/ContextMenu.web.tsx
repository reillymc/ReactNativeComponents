import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    type DimensionValue,
    type LayoutChangeEvent,
    StyleSheet,
    useWindowDimensions,
    View,
    type ViewInstance,
    type ViewStyle,
} from "react-native";

import { Menu } from "../menu";
import type {
    ContextMenuAction,
    ContextMenuPosition,
    ContextMenuProps,
} from "./ContextMenu";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuItemContext } from "./ContextMenuItemContext";
import { useContextMenuTrigger } from "./useContextMenuTrigger.web";

const FIXED_POSITION = "fixed" as ViewStyle["position"];
const MAX_CONTENT_WIDTH = "max-content" as DimensionValue;
const VIEWPORT_MARGIN = 8;

type MenuSize = {
    width: number;
    height: number;
};

type MenuItemEntry = {
    element: HTMLElement;
    index: number;
};

const getNavigationIndex = (
    key: string,
    currentIndex: number,
    length: number,
): number | undefined => {
    switch (key) {
        case "ArrowDown":
            return currentIndex < 0 ? 0 : currentIndex + 1;
        case "ArrowUp":
            return currentIndex < 0 ? length - 1 : currentIndex - 1;
        case "Home":
            return 0;
        case "End":
            return length - 1;
        default:
            return undefined;
    }
};

type ContextMenuOverlayProps<A extends ContextMenuAction> = {
    position: ContextMenuPosition;
    actions: ReadonlyArray<A>;
    onActionPress?: (action: A) => void;
    onDismiss: (restoreFocus?: boolean) => void;
    renderItem?: (action: A) => ReactNode;
};

const ContextMenuOverlay = <A extends ContextMenuAction>({
    position,
    actions,
    onActionPress,
    onDismiss,
    renderItem,
}: ContextMenuOverlayProps<A>) => {
    const [size, setSize] = useState<MenuSize>();
    const [activeIndex, setActiveIndex] = useState<number>();
    const menuRef = useRef<ViewInstance>(null);
    const { width: viewportWidth, height: viewportHeight } =
        useWindowDimensions();

    const onLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;

        setSize((previous) =>
            previous?.width === width && previous.height === height
                ? previous
                : { width, height },
        );
    };

    useEffect(() => {
        const node = menuRef.current as HTMLElement | null;
        if (!node) return;

        const getMenuItems = (): MenuItemEntry[] =>
            Array.from(node.querySelectorAll<HTMLElement>('[role="menuitem"]'))
                .map((element, index) => ({ element, index }))
                .filter(
                    ({ element }) =>
                        element.getAttribute("aria-disabled") !== "true",
                );

        const focusItem = (position: number) => {
            const items = getMenuItems();
            if (items.length === 0) return;

            const item = items[(position + items.length) % items.length];
            if (!item) return;

            item.element.focus();
            setActiveIndex(item.index);
        };

        const getFocusedPosition = (items: MenuItemEntry[]) => {
            const activeElement = document.activeElement;
            if (!activeElement) return -1;

            return items.findIndex(
                ({ element }) =>
                    element === activeElement ||
                    element.contains(activeElement),
            );
        };

        const isInsideMenu = (target: EventTarget | null) =>
            !!target && target instanceof Node && node.contains(target);

        const handleMouseDown = (event: MouseEvent) => {
            if (!isInsideMenu(event.target)) onDismiss(false);
        };

        const handleScroll = (event: Event) => {
            if (!isInsideMenu(event.target)) onDismiss(false);
        };

        const handleResize = () => onDismiss(false);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.key === "Tab") {
                onDismiss(true);
                return;
            }

            if (!isInsideMenu(event.target)) return;

            const items = getMenuItems();
            if (items.length === 0) return;

            const nextPosition = getNavigationIndex(
                event.key,
                getFocusedPosition(items),
                items.length,
            );

            if (nextPosition === undefined) return;

            event.preventDefault();
            focusItem(nextPosition);
        };

        document.addEventListener("mousedown", handleMouseDown, true);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);
        document.addEventListener("keydown", handleKeyDown, true);

        const frame = requestAnimationFrame(() => node.focus());

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("mousedown", handleMouseDown, true);
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [onDismiss]);

    if (typeof document === "undefined") return null;

    const width = size?.width ?? 0;
    const height = size?.height ?? 0;
    const maxLeft = Math.max(
        VIEWPORT_MARGIN,
        viewportWidth - width - VIEWPORT_MARGIN,
    );
    const maxTop = Math.max(
        VIEWPORT_MARGIN,
        viewportHeight - height - VIEWPORT_MARGIN,
    );
    const left =
        position.x + width + VIEWPORT_MARGIN > viewportWidth
            ? Math.max(VIEWPORT_MARGIN, position.x - width)
            : position.x;
    const top =
        position.y + height + VIEWPORT_MARGIN > viewportHeight
            ? Math.max(VIEWPORT_MARGIN, position.y - height)
            : position.y;

    return createPortal(
        <View
            ref={menuRef}
            role="menu"
            tabIndex={-1}
            onLayout={onLayout}
            style={[
                styles.container,
                { maxWidth: viewportWidth - VIEWPORT_MARGIN * 2 },
                size
                    ? {
                          left: Math.min(
                              Math.max(VIEWPORT_MARGIN, left),
                              maxLeft,
                          ),
                          top: Math.min(Math.max(VIEWPORT_MARGIN, top), maxTop),
                      }
                    : styles.hidden,
            ]}
        >
            <Menu
                data={actions}
                activeIndex={activeIndex}
                initialNumToRender={actions.length}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => {
                    const onActionActivated = () => {
                        onActionPress?.(item);
                        onDismiss(true);
                    };

                    return (
                        <ContextMenuItemContext.Provider
                            key={item.key}
                            value={{
                                active: index === activeIndex,
                                onActionActivated,
                            }}
                        >
                            {renderItem ? (
                                renderItem(item)
                            ) : (
                                <ContextMenuItem
                                    label={item.label}
                                    description={item.description}
                                    disabled={item.disabled}
                                />
                            )}
                        </ContextMenuItemContext.Provider>
                    );
                }}
            />
        </View>,
        document.body,
    );
};

export const ContextMenu = <A extends ContextMenuAction = ContextMenuAction>({
    actions,
    onActionPress,
    renderItem,
    style,
    tabIndex,
    children,
}: ContextMenuProps<A>) => {
    const { rootProps, position, dismiss } = useContextMenuTrigger({
        hasActions: actions.length > 0,
        tabIndex,
    });

    return (
        <>
            <View {...rootProps} style={style}>
                {children}
            </View>
            {position ? (
                <ContextMenuOverlay
                    position={position}
                    actions={actions}
                    onActionPress={onActionPress}
                    onDismiss={dismiss}
                    renderItem={renderItem}
                />
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: FIXED_POSITION,
        zIndex: 9999,
        width: MAX_CONTENT_WIDTH,
    },
    hidden: {
        position: FIXED_POSITION,
        zIndex: 9999,
        opacity: 0,
        pointerEvents: "none",
    },
});
