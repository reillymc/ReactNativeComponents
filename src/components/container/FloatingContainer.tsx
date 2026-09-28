import {
    type FC,
    type ReactNode,
    type RefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import {
    I18nManager,
    KeyboardAvoidingView,
    type LayoutChangeEvent,
    Platform,
    type StyleProp,
    StyleSheet,
    type TextInput,
    useWindowDimensions,
    View,
    type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export type PanelLayout = {
    parentY: number;
    parentHeight: number;
    inverted: boolean;
    visibleAreaHeight: number;
    parentX?: number;
    parentWidth?: number;
};

export type FloatingContainerStyles = {
    parentMargin: number;
};

export interface FloatingContainerProps {
    parentRef: RefObject<TextInput | null>;
    show?: boolean;
    position?: "auto" | "above";
    children?: ReactNode | ((panelLayout: PanelLayout) => ReactNode);
    containerStyle?: StyleProp<ViewStyle>;
}

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

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const [visibleAreaHeight, setVisibleAreaHeight] = useState(screenHeight);

    const onVisibleAreaLayout = useCallback((e: LayoutChangeEvent) => {
        setVisibleAreaHeight(e.nativeEvent.layout.height);
    }, []);

    const onPanelLayout = (e: LayoutChangeEvent) => {
        parentRef.current?.measureInWindow(
            (parentX, parentY, parentWidth, parentHeight) => {
                const panelHeight = e.nativeEvent.layout.height;

                // Available space below the parent, excluding the safe top inset.
                const parentBottom = parentY + parentHeight;
                const availableBelow = visibleAreaHeight - top - parentBottom;

                // If not enough space below for the panel, invert (show above)
                const inverted =
                    position === "above" || availableBelow < panelHeight;

                setLayout({
                    parentY,
                    parentHeight,
                    inverted,
                    visibleAreaHeight,
                    parentX,
                    parentWidth,
                });
            },
        );
    };

    const panelX =
        layout?.parentX !== undefined && layout.parentWidth !== undefined
            ? I18nManager.isRTL
                ? screenWidth - layout.parentX - layout.parentWidth
                : layout.parentX
            : layout?.parentX;

    return (
        <FullWindowOverlay>
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: "padding" })}
                style={[styles.keyboardView]}
                pointerEvents="box-none"
                onLayout={onVisibleAreaLayout}
            >
                {show && (
                    <View
                        ref={containerRef}
                        onLayout={onPanelLayout}
                        pointerEvents="box-none"
                        style={[
                            styles.container,
                            panelX !== undefined && { left: panelX },
                            containerStyle,
                        ]}
                    >
                        {typeof children === "function"
                            ? children(layout ?? EMPTY_PANEL_LAYOUT)
                            : children}
                    </View>
                )}
            </KeyboardAvoidingView>
        </FullWindowOverlay>
    );
};

const createStyles = (
    { styles: { floatingContainer } }: ThemedStyles,
    { layout }: { layout: PanelLayout | undefined },
) =>
    StyleSheet.create({
        keyboardView: StyleSheet.absoluteFill,
        container: layout
            ? {
                  position: "absolute",
                  zIndex: 10,
                  width: layout.parentWidth,
                  overflow: "hidden",
                  top: layout.inverted
                      ? undefined
                      : layout.parentY + layout.parentHeight,
                  bottom: layout.inverted
                      ? layout.visibleAreaHeight - layout.parentY
                      : undefined,
                  marginTop: floatingContainer.parentMargin,
                  marginBottom: floatingContainer.parentMargin,
              }
            : { opacity: 0 },
    });
