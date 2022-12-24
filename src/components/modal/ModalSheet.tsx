import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
    BottomSheetView,
    BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";

export type ModalHeight = "small" | "mid" | "full";

export interface ModalSheetStyles {
    height: {
        [key in ModalHeight]: number | string;
    };
    borderRadius: number;
    backgroundColor: string;
    backdropColor: string;
}

interface ModalSheetProps {
    show: boolean;
    preventDragToClose?: boolean;

    keyboardBehavior?: "extend" | "interactive";
    height?: ModalHeight;

    /**
     * Supports
     * - `<ModalHeader />`
     */
    header?: React.ReactNode;

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
    onClose,
}) => {
    const ref = React.useRef<BottomSheet>(null);

    const styles = useThemedStyles(createStyles, {});
    const {
        styles: { modalSheet },
    } = useTheme();

    React.useEffect(() => {
        if (!show) {
            Keyboard.dismiss();
            if (ref.current) ref.current.close();
        }
    }, [show, ref]);

    return (
        <Portal>
            <BottomSheet
                ref={ref}
                index={show ? 0 : -1}
                enableOverDrag
                enablePanDownToClose={!preventDragToClose}
                backgroundStyle={styles.sheetBackground}
                keyboardBlurBehavior={show ? "restore" : "none"}
                snapPoints={[modalSheet.height[height]]}
                keyboardBehavior={keyboardBehavior}
                onClose={show ? onClose : undefined}
                backdropComponent={props => (
                    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0}>
                        <View style={styles.backdrop} />
                    </BottomSheetBackdrop>
                )}
            >
                {header}
                {show && children}
            </BottomSheet>
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

const createStyles = ({ styles: { modalSheet } }: ThemedStyles) =>
    StyleSheet.create({
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
