import { type FC, useRef, useState } from "react";
import {
    type LayoutChangeEvent,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    type ThemedStyles,
    usePersistentKeyboardHeight,
    useThemedStyles,
} from "../../hooks";
import type { FloatingContainerProps, PanelLayout } from "./FloatingContainer";

const EMPTY_PANEL_LAYOUT: PanelLayout = {
    parentY: 0,
    parentHeight: 0,
    inverted: false,
    visibleAreaHeight: 0,
};

export const FloatingContainer: FC<FloatingContainerProps> = ({
    parentRef,
    show,
    position = "auto",
    containerStyle,
    children,
}) => {
    const containerRef = useRef<View>(null);
    const [layout, setLayout] = useState<PanelLayout>();

    const [styles] = useThemedStyles("floatingContainer", createStyles, {
        props: { layout },
    });

    const { height: screenHeight } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const { keyboardHeight } = usePersistentKeyboardHeight();

    const onLayout = (e: LayoutChangeEvent) => {
        parentRef.current?.measureInWindow(
            (_ix, parentY, _iw, parentHeight) => {
                const { height: panelHeight } = e.nativeEvent.layout;
                const size = parentY + parentHeight + panelHeight;
                const screenMaxHeight = screenHeight - keyboardHeight - top;

                setLayout({
                    parentY,
                    parentHeight,
                    inverted: position === "above" || size > screenMaxHeight,
                    visibleAreaHeight: screenMaxHeight,
                });
            },
        );
    };

    return (
        <View
            ref={containerRef}
            style={[styles.container, containerStyle]}
            onLayout={onLayout}
        >
            {show &&
                (typeof children === "function"
                    ? children(layout ?? EMPTY_PANEL_LAYOUT)
                    : children)}
        </View>
    );
};

const createStyles = (
    { styles: { floatingContainer } }: ThemedStyles,
    { layout }: { layout: PanelLayout | undefined },
) =>
    StyleSheet.create({
        container: {
            position: "absolute",
            bottom: layout?.inverted ? layout.parentHeight : undefined,
            opacity: layout ? 1 : 0,
            zIndex: 10,
            width: "100%",
            overflow: "hidden",
            top: layout?.inverted ? undefined : layout?.parentHeight,
            marginTop: layout?.inverted
                ? undefined
                : floatingContainer.parentMargin,
            marginBottom: layout?.inverted
                ? floatingContainer.parentMargin
                : undefined,
        },
    });
