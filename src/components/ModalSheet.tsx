import React from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

export type ModalHeight = "small" | "mid" | "full";

const heightToSnapPoint = (height: ModalHeight) => {
    switch (height) {
        case "small":
            return ["24%"];
        case "mid":
            return ["52%"];
        case "full":
            return ["94%"];
    }
};

interface ModalSheetProps {
    show: boolean;
    height: ModalHeight;
    children?: React.ReactNode;
    onClose: () => void;
}

const ModalSheet: React.FC<ModalSheetProps> = ({ show, height, children, onClose }) => (
    <Portal>
        <BottomSheet
            index={show ? 0 : -1}
            enableOverDrag
            enablePanDownToClose
            backgroundStyle={styles.sheetBackground}
            snapPoints={heightToSnapPoint(height)}
            onClose={onClose}
            backdropComponent={props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />}
        >
            {children}
        </BottomSheet>
    </Portal>
);

export { ModalSheet, ModalSheetProps };

const styles = StyleSheet.create({
    sheetBackground: {
        flex: 1,
        borderRadius: 16,
    },
});
