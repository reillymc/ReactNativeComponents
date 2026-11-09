import {
    isValidElement,
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
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

import { ContextActionContext } from "../../actions/contextAction/ContextActionContext";
import { Menu } from "../../overlays/menu";

const FIXED_POSITION = "fixed" as ViewStyle["position"];
const MAX_CONTENT_WIDTH = "max-content" as DimensionValue;
const VIEWPORT_MARGIN = 8;

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

type MenuSize = {
    width: number;
    height: number;
};

export type ContextMenuDismissReason =
    | "outside"
    | "scroll"
    | "resize"
    | "escape"
    | "tab"
    | "activate";

export interface ContextMenuProps {
    anchor: { x: number; y: number };
    actions: ReadonlyArray<ReactNode>;
    initialActive?: boolean;
    onDismiss: (reason: ContextMenuDismissReason) => void;
}

export const ContextMenu = ({
    anchor,
    actions,
    initialActive,
    onDismiss,
}: ContextMenuProps) => {
    const [size, setSize] = useState<MenuSize>();
    const [activeIndex, setActiveIndex] = useState<number>();
    const hasActiveRef = useRef(false);
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

        const getMenuItems = () =>
            Array.from(
                node.querySelectorAll<HTMLElement>('[role="menuitem"]'),
            ).filter((item) => item.getAttribute("aria-disabled") !== "true");

        const focusItem = (index: number) => {
            const items = getMenuItems();
            if (items.length === 0) return;

            const nextIndex = (index + items.length) % items.length;
            items[nextIndex]?.focus();
            hasActiveRef.current = true;
            setActiveIndex(nextIndex);
        };

        const isInsideMenu = (target: EventTarget | null) =>
            !!target && target instanceof Node && node.contains(target);

        const handleMouseDown = (event: MouseEvent) => {
            if (!isInsideMenu(event.target)) onDismiss("outside");
        };

        const handleScroll = (event: Event) => {
            if (!isInsideMenu(event.target)) onDismiss("scroll");
        };

        const handleResize = () => onDismiss("resize");

        const handleNavigationKey = (
            event: KeyboardEvent,
            items: Array<HTMLElement>,
        ) => {
            const nextIndex = getNavigationIndex(
                event.key,
                hasActiveRef.current
                    ? items.indexOf(document.activeElement as HTMLElement)
                    : -1,
                items.length,
            );

            if (nextIndex === undefined) return;

            event.preventDefault();
            focusItem(nextIndex);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onDismiss("escape");
                return;
            }

            if (event.key === "Tab") {
                onDismiss("tab");
                return;
            }

            if (!isInsideMenu(event.target)) return;

            const items = getMenuItems();
            if (items.length === 0) return;

            handleNavigationKey(event, items);
        };

        document.addEventListener("mousedown", handleMouseDown, true);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);
        document.addEventListener("keydown", handleKeyDown, true);

        const frame = requestAnimationFrame(() => {
            const items = getMenuItems();
            items[0]?.focus();

            if (initialActive) {
                hasActiveRef.current = true;
                setActiveIndex(0);
            }
        });

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener("mousedown", handleMouseDown, true);
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [initialActive, onDismiss]);

    const keyExtractor = useCallback((item: ReactNode, index: number) => {
        if (isValidElement(item) && item.key != null) {
            return String(item.key);
        }

        return String(index);
    }, []);

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
        anchor.x + width + VIEWPORT_MARGIN > viewportWidth
            ? Math.max(VIEWPORT_MARGIN, anchor.x - width)
            : anchor.x;
    const top =
        anchor.y + height + VIEWPORT_MARGIN > viewportHeight
            ? Math.max(VIEWPORT_MARGIN, anchor.y - height)
            : anchor.y;

    return createPortal(
        <View
            ref={menuRef}
            role="menu"
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
                keyExtractor={keyExtractor}
                renderItem={({ item, index }) => (
                    <ContextActionContext.Provider
                        value={{
                            layout: "menu",
                            active: index === activeIndex,
                            onActionActivated: () => onDismiss("activate"),
                        }}
                    >
                        {item}
                    </ContextActionContext.Provider>
                )}
            />
        </View>,
        document.body,
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
