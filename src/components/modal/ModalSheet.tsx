/* eslint-disable react/no-unstable-nested-components */
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetFooter,
    BottomSheetModal,
    BottomSheetProps,
    BottomSheetScrollView,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React from "react";
import { Keyboard, StyleSheet, View, useColorScheme } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { FullWindowOverlayWrapper } from "../FullWindowOverlayWrapper";

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
    handleComponent?: React.ReactNode;
    enableDynamicSizing?: boolean;

    height?: ModalHeight | ModalHeight[];

    /**
     * Supports
     * - `<ModalHeader />`
     */
    header?: React.ReactNode;

    footer?: React.ReactNode;

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
    height,
    keyboardBehavior = "extend",
    children,
    preventDragToClose,
    enableDynamicSizing = false,
    handleComponent,
    header,
    footer,
    onClose,
}) => {
    const ref = React.useRef<BottomSheetModal>(null);
    const colorScheme = useColorScheme();

    const styles = useThemedStyles(createStyles, {});
    const {
        styles: { modalSheet },
    } = useTheme();

    React.useEffect(() => {
        if (show) {
            ref.current?.present();
        } else {
            Keyboard.dismiss();
            setTimeout(() => {
                ref.current?.close();
            }, 1);
        }
    }, [show, ref]);

    const handleClose = () => {
        onClose();
        Keyboard.dismiss();
        setTimeout(() => {
            ref.current?.close();
        }, 10);
    };

    const snapPoints = React.useMemo(() => {
        if (Array.isArray(height)) {
            return height.map(h => modalSheet.height[h]);
        }
        return height ? [modalSheet.height[height]] : undefined;
    }, [height, modalSheet.height]);

    return (
        <FullWindowOverlayWrapper>
            <BottomSheetModal
                ref={ref}
                index={show ? 0 : -1}
                enableOverDrag
                handleComponent={
                    handleComponent
                        ? () => <View style={{ flex: 1, alignItems: "center", paddingTop: 8 }}>{handleComponent}</View>
                        : undefined
                }
                footerComponent={({ animatedFooterPosition }) => {
                    return (
                        <BottomSheetFooter
                            bottomInset={0}
                            animatedFooterPosition={animatedFooterPosition}
                            style={styles.footer}
                        >
                            <View>{footer}</View>
                        </BottomSheetFooter>
                    );
                }}
                enablePanDownToClose={!preventDragToClose}
                enableDynamicSizing={enableDynamicSizing}
                stackBehavior="push"
                enableDismissOnClose
                onDismiss={handleClose}
                keyboardBlurBehavior={show ? "restore" : "none"}
                snapPoints={snapPoints}
                keyboardBehavior={keyboardBehavior}
                backgroundComponent={({ pointerEvents, style }) => (
                    <View
                        pointerEvents={pointerEvents}
                        accessible={true}
                        accessibilityRole="adjustable"
                        accessibilityLabel="Bottom Sheet"
                        style={[styles.sheetBackground, style]}
                    >
                        <BlurView
                            intensity={80}
                            tint={colorScheme === "light" ? "extraLight" : "dark"}
                            style={{ flex: 1 }}
                        />
                    </View>
                )}
                backdropComponent={props => (
                    <BottomSheetBackdrop opacity={0.25} {...props} disappearsOnIndex={-1} appearsOnIndex={0}>
                        <View style={styles.backdrop} />
                    </BottomSheetBackdrop>
                )}
            >
                {header}
                {show && children}
            </BottomSheetModal>
        </FullWindowOverlayWrapper>
    );
};

ModalSheet.displayName = "ModalSheet";

export {
    ModalSheet,
    BottomSheetFlatList as ModalSheetFlatList,
    ModalSheetProps,
    BottomSheetScrollView as ModalSheetScrollView,
    BottomSheetView as ModalSheetView,
};

const createStyles = ({ styles: { modalSheet } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        sheetBackground: {
            borderRadius: modalSheet.borderRadius,
            overflow: "hidden",
        },
        backdrop: {
            display: "flex",
            flexGrow: 1,
            backgroundColor: modalSheet.backdropColor,
        },
        footer: {
            shadowColor: "black",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: {
                width: 4,
                height: 4,
            },
        },
    });
    return styles;
};
