import { useCallback, useEffect, useRef, useState } from "react";
import {
    type LayoutChangeEvent,
    Platform,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    type ThemedStyles,
    usePersistentKeyboardHeight,
    useThemedStyles,
} from "../../../hooks";
import type {
    AnchoredContainerProps,
    ContainerGeometry,
} from "./AnchoredContainer";

type AnchoredContainerPositionOptions = Pick<
    AnchoredContainerProps,
    "parentRef" | "show" | "position" | "gap" | "onInvertedChange"
>;

export const useAnchoredContainerPosition = ({
    parentRef,
    show,
    position = "auto",
    gap,
    onInvertedChange,
}: AnchoredContainerPositionOptions) => {
    const [geometry, setGeometry] = useState<ContainerGeometry>();
    const [styles] = useThemedStyles("anchoredContainer", createStyles, {
        props: { geometry, gap },
    });
    const [{ parentMargin }] = useThemedStyles(
        "anchoredContainer",
        ({ styles: { anchoredContainer } }: ThemedStyles) => ({
            parentMargin: anchoredContainer.parentMargin,
        }),
    );

    const margin = gap ?? parentMargin;

    const { height: screenHeight } = useWindowDimensions();
    const { top, bottom } = useSafeAreaInsets();

    const { keyboardHeight } = usePersistentKeyboardHeight();

    const keyboardInset = Platform.OS === "ios" ? keyboardHeight : 0;

    const contentHeightRef = useRef(0);

    const measure = useCallback(() => {
        const contentHeight = contentHeightRef.current;
        if (!contentHeight) return;

        parentRef.current?.measure((_x, offsetY, _w, height) => {
            parentRef.current?.measureInWindow(
                (_windowX, windowY, _windowWidth, _windowHeight) => {
                    const viewportTop = top;
                    const viewportBottom =
                        screenHeight - keyboardInset - bottom;
                    const availableBelow = viewportBottom - (windowY + height);
                    const availableAbove = windowY - viewportTop;

                    const inverted =
                        position === "above" ||
                        (availableBelow < contentHeight + margin &&
                            availableAbove > availableBelow);

                    setGeometry({
                        parentY: windowY,
                        parentHeight: height,
                        offsetY,
                        contentHeight,
                        inverted,
                        visibleAreaHeight: viewportBottom - viewportTop,
                        maxHeight: Math.max(
                            0,
                            (inverted ? availableAbove : availableBelow) -
                                margin,
                        ),
                    });
                },
            );
        });
    }, [parentRef, position, screenHeight, keyboardInset, top, bottom, margin]);

    const onLayout = (e: LayoutChangeEvent) => {
        contentHeightRef.current = e.nativeEvent.layout.height;
        measure();
    };

    useEffect(() => {
        if (!show) {
            contentHeightRef.current = 0;
            setGeometry(undefined);
            return;
        }

        measure();
    }, [show, measure]);

    const inverted = geometry?.inverted;

    useEffect(() => {
        if (inverted !== undefined) {
            onInvertedChange?.(inverted);
        }
    }, [inverted, onInvertedChange]);

    return {
        geometry,
        inlineStyle: styles.container,
        margin,
        onLayout,
    };
};

const createStyles = (
    { styles: { anchoredContainer } }: ThemedStyles,
    {
        geometry,
        gap,
    }: { geometry: ContainerGeometry | undefined; gap: number | undefined },
) => {
    const margin = gap ?? anchoredContainer.parentMargin;

    return StyleSheet.create({
        container: geometry
            ? {
                  position: "absolute",
                  zIndex: 10,
                  elevation: 8,
                  left: 0,
                  right: 0,
                  top: geometry.inverted
                      ? geometry.offsetY - geometry.contentHeight - margin
                      : geometry.offsetY + geometry.parentHeight + margin,
              }
            : {
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
              },
    });
};
