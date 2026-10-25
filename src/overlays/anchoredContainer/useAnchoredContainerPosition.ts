import { useCallback, useEffect, useRef, useState } from "react";
import {
    Keyboard,
    type LayoutChangeEvent,
    Platform,
    StyleSheet,
    useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useComponent } from "../../internal";
import type {
    AnchoredContainerProps,
    AnchoredContainerTheme,
    ContainerGeometry,
} from "./AnchoredContainer";

type AnchoredContainerPositionOptions = Pick<
    AnchoredContainerProps,
    "parentRef" | "show" | "position" | "theme" | "onInvertedChange"
>;

export const useAnchoredContainerPosition = ({
    parentRef,
    show,
    theme: themeOverrides,
    position = "auto",
    onInvertedChange,
}: AnchoredContainerPositionOptions) => {
    const [geometry, setGeometry] = useState<ContainerGeometry>();
    const { styles, theme } = useComponent("anchoredContainer", {
        themeOverrides,
        props: { geometry },
        createStyles,
    });

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
                        (availableBelow < contentHeight + theme.parentMargin &&
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
                                theme.parentMargin,
                        ),
                    });
                },
            );
        });
    }, [
        parentRef,
        position,
        screenHeight,
        keyboardInset,
        top,
        bottom,
        theme.parentMargin,
    ]);

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
        parentMargin: theme.parentMargin,
        onLayout,
    };
};

const createStyles = (
    theme: AnchoredContainerTheme,
    { geometry }: { geometry: ContainerGeometry | undefined },
) =>
    StyleSheet.create({
        container: geometry
            ? {
                  position: "absolute",
                  zIndex: 10,
                  elevation: 8,
                  left: 0,
                  right: 0,
                  top: geometry.inverted
                      ? geometry.offsetY -
                        geometry.contentHeight -
                        theme.parentMargin
                      : geometry.offsetY +
                        geometry.parentHeight +
                        theme.parentMargin,
              }
            : {
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
              },
    });

const isIos = Platform.OS === "ios";
const keyboardShowEvent = isIos ? "keyboardWillShow" : "keyboardDidShow";
const keyboardHideEvent = "keyboardDidHide";

const usePersistentKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showListener = Keyboard.addListener(
            keyboardShowEvent,
            (event) => {
                setKeyboardHeight(event.endCoordinates.height);
            },
        );
        const hideListener = Keyboard.addListener(keyboardHideEvent, () => {
            setKeyboardHeight(0);
        });

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return { keyboardHeight };
};
