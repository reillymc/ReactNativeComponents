import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    type LayoutChangeEvent,
    StyleSheet,
    useWindowDimensions,
    View,
    type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useComponent } from "../../internal";
import type {
    AnchoredContainerProps,
    ContainerGeometry,
} from "./AnchoredContainer";
import { getContainerPlacement } from "./helpers";

const FIXED_POSITION = "fixed" as unknown as ViewStyle["position"];

type AnchorRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const AnchoredContainer: FC<AnchoredContainerProps> = ({
    parentRef,
    anchorRef,
    show,
    position = "auto",
    theme: themeOverrides,
    onInvertedChange,
    style,
    children,
}) => {
    const [geometry, setGeometry] = useState<ContainerGeometry>();
    const { theme } = useComponent("anchoredContainer", { themeOverrides });
    const inverted = geometry?.inverted;

    useEffect(() => {
        if (inverted !== undefined) {
            onInvertedChange?.(inverted);
        }
    }, [inverted, onInvertedChange]);

    const { height: windowHeight } = useWindowDimensions();
    const { top, bottom } = useSafeAreaInsets();

    const anchorRectRef = useRef<AnchorRect | undefined>(undefined);
    const contentHeightRef = useRef(0);

    const recompute = useCallback(() => {
        const anchor = anchorRectRef.current;
        const contentHeight = contentHeightRef.current;
        if (!(anchor && contentHeight)) return;

        const viewportTop = top;
        const viewportBottom = windowHeight - bottom;
        const availableBelow = viewportBottom - (anchor.y + anchor.height);
        const availableAbove = anchor.y - viewportTop;

        const inverted =
            position === "above" ||
            (availableBelow < contentHeight + theme.parentMargin &&
                availableAbove > availableBelow);

        setGeometry({
            parentY: anchor.y,
            parentX: anchor.x,
            parentWidth: anchor.width,
            parentHeight: anchor.height,
            offsetY: anchor.y,
            contentHeight,
            inverted,
            visibleAreaHeight: viewportBottom - viewportTop,
            maxHeight: Math.max(
                0,
                (inverted ? availableAbove : availableBelow) -
                    theme.parentMargin,
            ),
        });
    }, [position, theme.parentMargin, top, bottom, windowHeight]);

    const updateAnchor = useCallback(() => {
        const anchorElement = anchorRef?.current as unknown as
            | Element
            | null
            | undefined;
        const parentElement = parentRef.current as unknown as
            | Element
            | null
            | undefined;
        const element = anchorElement ?? parentElement;

        if (element?.getBoundingClientRect) {
            const rect = element.getBoundingClientRect();
            anchorRectRef.current = {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
            };
        }

        recompute();
    }, [anchorRef, parentRef, recompute]);

    useEffect(() => {
        if (!show || typeof document === "undefined") return;

        updateAnchor();

        let frame = 0;
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(updateAnchor);
        };

        window.addEventListener("scroll", schedule, true);
        window.addEventListener("resize", schedule);

        const node =
            (anchorRef?.current as unknown as Element | null | undefined) ??
            parentRef.current;
        let observer: ResizeObserver | undefined;
        if (node instanceof Element && typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(schedule);
            observer.observe(node);
        }

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule, true);
            window.removeEventListener("resize", schedule);
            observer?.disconnect();
        };
    }, [show, updateAnchor, anchorRef, parentRef]);

    useEffect(() => {
        if (!show) {
            setGeometry(undefined);
            anchorRectRef.current = undefined;
            contentHeightRef.current = 0;
        }
    }, [show]);

    const onLayout = (e: LayoutChangeEvent) => {
        const height = e.nativeEvent.layout.height;
        if (height !== contentHeightRef.current) {
            contentHeightRef.current = height;
            recompute();
        }
    };

    if (!show || typeof document === "undefined") return null;

    return createPortal(
        <View
            onLayout={onLayout}
            style={[
                styles.container,
                geometry
                    ? {
                          left: geometry.parentX,
                          width: geometry.parentWidth,
                          top: geometry.inverted
                              ? geometry.parentY -
                                geometry.contentHeight -
                                theme.parentMargin
                              : geometry.parentY +
                                geometry.parentHeight +
                                theme.parentMargin,
                      }
                    : styles.hidden,
                style,
            ]}
        >
            {typeof children === "function"
                ? children(getContainerPlacement(geometry))
                : (children ?? null)}
        </View>,
        document.body,
    );
};

const styles = StyleSheet.create({
    container: {
        position: FIXED_POSITION,
        zIndex: 9999,
    },
    hidden: {
        position: FIXED_POSITION,
        zIndex: 9999,
        opacity: 0,
        pointerEvents: "none",
    },
});
