/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
    BottomSheetView,
    BottomSheetFlatList,
    BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";

// react-native-screens is an optional peer dependency
let RNS: {
    FullWindowOverlay: React.ComponentType<{
        children: React.ReactNode;
    }>;
} | null = null;

try {
    RNS = require("react-native-screens");
} catch {}

export type ModalHeight = "small" | "mid" | "full";

export interface ModalSheetStyles {
    height: {
        [key in ModalHeight]: number | string;
    };
    borderRadius: number;
    backgroundColor: string;
    backdropColor: string;
}

interface ModalSheetProps extends Pick<BottomSheetProps, "keyboardBehavior"> {
    show: boolean;
    preventDragToClose?: boolean;

    height?: ModalHeight;

    /**
     * Supports
     * - `<ModalHeader />`
     */
    header?: React.ReactNode;

    footer?: React.ReactNode;

    handleComponent?: React.ReactElement;

    /**
     * Supports
     * - `<ModalSheetScrollView />`
     * - `<ModalSheetFlatList />`
     */
    children?: React.ReactNode;
    onClose: () => void;
}

const ModalSheet: React.FC<ModalSheetProps> = ({
    show,
    height = "mid",
    keyboardBehavior = "extend",
    children,
    preventDragToClose,
    header,
    footer,
    handleComponent,
    onClose,
}) => {
    const ref = React.useRef<BottomSheet>(null);

    const [isHide, setIsHide] = React.useState(true);
    const styles = useThemedStyles(createStyles, {});
    const {
        styles: { modalSheet },
    } = useTheme();

    React.useEffect(() => {
        if (show) {
            ref.current?.expand();
        } else {
            Keyboard.dismiss();
            ref.current?.close();
        }
    }, [show, ref]);

    // Temporary fix to avoid bottom sheet appearing under modal from react-native-screens.
    setTimeout(() => setIsHide(false), 1);

    if (isHide) {
        return null;
    }

    const WrapperElement = RNS?.FullWindowOverlay || React.Fragment;

    return (
        <Portal>
            <WrapperElement>
                <BottomSheet
                    ref={ref}
                    index={-1}
                    enableOverDrag
                    handleComponent={
                        handleComponent
                            ? () => (
                                  <View style={{ flex: 1, alignItems: "center", paddingTop: 8 }}>
                                      {handleComponent}
                                  </View>
                              )
                            : undefined
                    }
                    enablePanDownToClose={!preventDragToClose}
                    backgroundStyle={styles.sheetBackground}
                    keyboardBlurBehavior={show ? "restore" : "none"}
                    snapPoints={[modalSheet.height[height]]}
                    keyboardBehavior={keyboardBehavior}
                    onClose={onClose}
                    backdropComponent={props => (
                        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0}>
                            <View style={styles.backdrop} />
                        </BottomSheetBackdrop>
                    )}
                >
                    {header}
                    {show && children}
                    {footer}
                </BottomSheet>
            </WrapperElement>
        </Portal>
    );
};

ModalSheet.displayName = "ModalSheet";

export {
    ModalSheet,
    ModalSheetProps,
    BottomSheetScrollView as ModalSheetScrollView,
    BottomSheetFlatList as ModalSheetFlatList,
    BottomSheetView as ModalSheetView,
};

const createStyles = ({ styles: { modalSheet } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        sheetBackground: {
            flex: 1,
            borderRadius: modalSheet.borderRadius,
            backgroundColor: modalSheet.backgroundColor,
        },
        backdrop: {
            display: "flex",
            flexGrow: 1,
            backgroundColor: modalSheet.backdropColor,
        },
    });
    return styles;
};
