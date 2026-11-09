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

import { type ThemedStyles, useThemedStyles } from "../../../hooks";
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
    show,
    position = "auto",
    gap,
    onInvertedChange,
    containerStyle,
    children,
}) => {
    const [geometry, setGeometry] = useState<ContainerGeometry>();
    const [styles] = useThemedStyles("anchoredContainer", createStyles);
    const [{ parentMargin }] = useThemedStyles(
        "anchoredContainer",
        ({ styles: { anchoredContainer } }: ThemedStyles) => ({
            parentMargin: anchoredContainer.parentMargin,
        }),
    );

    const margin = gap ?? parentMargin;

    const inverted = geometry?.inverted;

    useEffect(() => {
        if (inverted !== undefined) {
            onInvertedChange?.(inverted);
        }
    }, [inverted, onInvertedChange]);

    const { height: windowHeight } = useWindowDimensions();
    const { top, bottom } = useSafeAreaInsets();

    const anchorRef = useRef<AnchorRect | undefined>(undefined);
    const contentHeightRef = useRef(0);

    const recompute = useCallback(() => {
        const anchor = anchorRef.current;
        const contentHeight = contentHeightRef.current;
        if (!(anchor && contentHeight)) return;

        const viewportTop = top;
        const viewportBottom = windowHeight - bottom;
        const availableBelow = viewportBottom - (anchor.y + anchor.height);
        const availableAbove = anchor.y - viewportTop;

        const inverted =
            position === "above" ||
            (availableBelow < contentHeight + margin &&
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
                (inverted ? availableAbove : availableBelow) - margin,
            ),
        });
    }, [position, margin, top, bottom, windowHeight]);

    const updateAnchor = useCallback(() => {
        const node = parentRef.current as unknown as {
            getBoundingClientRect?: () => DOMRect;
        } | null;

        if (node?.getBoundingClientRect) {
            const rect = node.getBoundingClientRect();
            anchorRef.current = {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
            };
        }

        recompute();
    }, [parentRef, recompute]);

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

        const node = parentRef.current as unknown as HTMLElement | null;
        let observer: ResizeObserver | undefined;
        if (node && typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(schedule);
            observer.observe(node);
        }

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule, true);
            window.removeEventListener("resize", schedule);
            observer?.disconnect();
        };
    }, [show, updateAnchor, parentRef]);

    useEffect(() => {
        if (!show) {
            setGeometry(undefined);
            anchorRef.current = undefined;
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
                                margin
                              : geometry.parentY +
                                geometry.parentHeight +
                                margin,
                      }
                    : styles.hidden,
                containerStyle,
            ]}
        >
            {typeof children === "function"
                ? children(getContainerPlacement(geometry))
                : children}
        </View>,
        document.body,
    );
};

const createStyles = (_themed: ThemedStyles) =>
    StyleSheet.create({
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
