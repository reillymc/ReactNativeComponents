import {
    type FC,
    type ReactNode,
    type RefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import {
    KeyboardAvoidingView,
    type LayoutChangeEvent,
    type StyleProp,
    StyleSheet,
    type TextInput,
    useWindowDimensions,
    View,
    type ViewStyle,
} from "react-native";
import { FullWindowOverlay } from "react-native-screens";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export type FloatingContainerStyles = {
    parentMargin: number;
};

type PanelLayout = {
    parentY: number;
    parentHeight: number;
    inverted: boolean;
    visibleAreaHeight: number;
    parentX?: number;
    parentWidth?: number;
};

export interface FloatingContainerProps {
    parentRef: RefObject<TextInput | null>;
    show?: boolean;
    children?:
        | ReactNode
        | ((panelLayout: Pick<PanelLayout, "inverted">) => ReactNode);
    containerStyle?: StyleProp<ViewStyle>;
}

export const FloatingContainer: FC<FloatingContainerProps> = ({
    parentRef,
    show,
    containerStyle,
    children,
}) => {
    const containerRef = useRef<View>(null);
    const [layout, setLayout] = useState<PanelLayout>();
    const styles = useThemedStyles(createStyles, layout);

    const { height: screenHeight } = useWindowDimensions();

    const [visibleAreaHeight, setVisibleAreaHeight] = useState(screenHeight);

    const onVisibleAreaLayout = useCallback((e: LayoutChangeEvent) => {
        setVisibleAreaHeight(e.nativeEvent.layout.height);
    }, []);

    const onPanelLayout = useCallback(
        (e: LayoutChangeEvent) => {
            parentRef.current?.measureInWindow(
                (parentX, parentY, parentWidth, parentHeight) => {
                    const panelHeight = e.nativeEvent.layout.height;

                    // Calculate available space below parent
                    const parentBottom = parentY + parentHeight;
                    const availableBelow = visibleAreaHeight - parentBottom;

                    // If not enough space below for the panel, invert (show above)
                    const inverted = availableBelow < panelHeight;

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
        },
        [parentRef, visibleAreaHeight],
    );

    return (
        <FullWindowOverlay>
            <KeyboardAvoidingView
                behavior="height"
                style={[styles.keyboardView]}
                pointerEvents="box-none"
                onLayout={onVisibleAreaLayout}
            >
                {show && (
                    <View
                        ref={containerRef}
                        onLayout={onPanelLayout}
                        pointerEvents="box-none"
                        style={[styles.container, containerStyle]}
                    >
                        {typeof children === "function"
                            ? children(layout ?? { inverted: false })
                            : children}
                    </View>
                )}
            </KeyboardAvoidingView>
        </FullWindowOverlay>
    );
};

const createStyles = (
    { styles: { floatingContainer } }: ThemedStyles,
    layout: PanelLayout | undefined,
) =>
    StyleSheet.create({
        keyboardView: StyleSheet.absoluteFillObject,
        container: layout
            ? {
                  position: "absolute",
                  zIndex: 10,
                  left: layout.parentX,
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
