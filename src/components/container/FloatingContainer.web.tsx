import {
    type FC,
    type ReactNode,
    type RefObject,
    useRef,
    useState,
} from "react";
import {
    type LayoutChangeEvent,
    type StyleProp,
    StyleSheet,
    type TextInput,
    useWindowDimensions,
    View,
    type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    type ThemedStyles,
    usePersistentKeyboardHeight,
    useThemedStyles,
} from "../../hooks";

export type FloatingContainerStyles = {
    parentMargin: number;
};

type PanelLayout = {
    parentHeight: number;
    inverted: boolean;
};

export interface FloatingContainerProps {
    parentRef: RefObject<TextInput | null>;
    children?: ReactNode | ((panelLayout: PanelLayout) => ReactNode);
    containerStyle?: StyleProp<ViewStyle>;
}

export const FloatingContainer: FC<FloatingContainerProps> = ({
    parentRef,
    containerStyle,
    children,
}) => {
    const containerRef = useRef<View>(null);

    const [layout, setLayout] = useState<PanelLayout>();

    const styles = useThemedStyles(createStyles, layout);

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
                    parentHeight,
                    inverted: size > screenMaxHeight,
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
            {typeof children === "function"
                ? children(
                      layout ?? {
                          inverted: false,
                          parentHeight: 0,
                      },
                  )
                : children}
        </View>
    );
};

const createStyles = (
    { styles: { floatingContainer } }: ThemedStyles,
    layout: PanelLayout | undefined,
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
