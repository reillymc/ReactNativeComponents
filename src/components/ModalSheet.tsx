import React from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

import { ThemedStyles, useTheme, useThemedStyles } from "../hooks";

export type ModalHeight = "small" | "mid" | "full";

export interface ModalSheetStyles {
    height: {
        [key in ModalHeight]: number | string;
    };
    borderRadius: number;
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

    if (!show && ref.current) ref.current.close();

    return (
        <Portal>
            <BottomSheet
                ref={ref}
                index={show ? 0 : -1}
                enableOverDrag
                enablePanDownToClose
                backgroundStyle={styles.sheetBackground}
                snapPoints={[modalSheet.height[height]]}
                onClose={onClose}
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

export { ModalSheet, ModalSheetProps };

const createStyles = ({ styles: { modalSheet } }: ThemedStyles) =>
    StyleSheet.create({
        sheetBackground: {
            flex: 1,
            borderRadius: modalSheet.borderRadius,
        },
    });
