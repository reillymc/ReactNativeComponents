import React from "react";
import { Keyboard, StyleSheet } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetScrollView,
    BottomSheetView,
    BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

import { ThemedStyles, useTheme, useThemedStyles } from "../hooks";

export type ModalHeight = "small" | "mid" | "full";

export interface ModalSheetStyles {
    height: {
        [key in ModalHeight]: number | string;
    };
    borderRadius: number;
    backgroundColor: string;
}

interface ModalSheetProps {
    show: boolean;
    height?: ModalHeight;
    children?: React.ReactNode;
    onClose: () => void;
}

const ModalSheet: React.FC<ModalSheetProps> = ({ show, height = "mid", children, onClose }) => {
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
                enablePanDownToClose
                backgroundStyle={styles.sheetBackground}
                keyboardBlurBehavior={show ? "restore" : "none"}
                snapPoints={[modalSheet.height[height]]}
                keyboardBehavior="extend"
                onClose={show ? onClose : undefined}
                backdropComponent={props => (
                    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
                )}
            >
                {children}
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
    });
