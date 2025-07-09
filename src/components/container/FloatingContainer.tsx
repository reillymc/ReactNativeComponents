import { type FC, type ReactNode, useCallback, useRef, useState } from "react";
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
    inputHeight: number;
    inverted: boolean;
};

export interface FloatingContainerProps {
    parentRef: React.RefObject<TextInput | null>;
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

    const onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            if (keyboardHeight === undefined) {
                setLayout(undefined);
                return;
            }

            parentRef.current?.measureInWindow(
                (_ix, inputY, _iw, inputHeight) => {
                    e.currentTarget.measureInWindow(
                        (_px, _py, _pw, panelHeight) => {
                            const size = inputY + inputHeight + panelHeight;
                            const screenMaxHeight =
                                screenHeight - keyboardHeight - top;

                            setLayout({
                                inputHeight,
                                inverted: size > screenMaxHeight,
                            });
                        },
                    );
                },
            );
        },
        [keyboardHeight, parentRef, top, screenHeight],
    );

    return (
        <View
            ref={containerRef}
            style={[styles.container, containerStyle]}
            onLayout={onLayout}
        >
            {layout &&
                (typeof children === "function"
                    ? children(layout ?? {})
                    : children)}
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
            bottom: layout?.inverted ? layout.inputHeight : undefined,
            opacity: layout ? 1 : 0,
            zIndex: 10,
            width: "100%",
            overflow: "hidden",
            top: layout?.inverted ? undefined : layout?.inputHeight,
            marginTop: layout?.inverted
                ? undefined
                : floatingContainer.parentMargin,
            marginBottom: layout?.inverted
                ? floatingContainer.parentMargin
                : undefined,
        },
    });
