import { BlurView } from "expo-blur";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, type TextInput, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type ThemedStyles, usePersistentKeyboardHeight, useThemedStyles } from "../../../hooks";
import type { ValueItem } from "../valueItem";

import { DropdownItem } from "./DropdownItem";

export interface DropdownPanelProps<T = string> {
    parentRef: React.RefObject<TextInput>;
    items: Array<ValueItem<T>>;
    searchValue: string;
    maxSuggestionCount?: number;
    visible: boolean;
    hideItemDescriptions?: boolean;
    searchInDescriptions?: boolean;
    onSelect: (e: ValueItem<T> | undefined, automated?: boolean) => void;
}

type PanelLayout = {
    inputHeight: number;
    inverted: boolean;
};

export const DropdownPanel = <T,>({
    parentRef,
    items = [],
    maxSuggestionCount = 5,
    searchValue,
    visible,
    hideItemDescriptions,
    searchInDescriptions,
    onSelect,
}: DropdownPanelProps<T>) => {
    const containerRef = useRef<View>(null);

    const [layout, setLayout] = useState<PanelLayout>();

    const styles = useThemedStyles(createStyles, layout);

    const { height: screenHeight } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const { keyboardHeight } = usePersistentKeyboardHeight();

    const displayItems = useMemo(() => {
        const search = searchValue.toLowerCase();

        const filteredItems = items
            .filter(
                ({ label, description }) =>
                    label.toLowerCase().includes(search) ||
                    (searchInDescriptions && description && description.toLowerCase().includes(search)),
            )
            .slice(0, maxSuggestionCount);

        if (layout?.inverted) {
            return filteredItems;
        }

        return filteredItems.reverse();
    }, [items, layout?.inverted, maxSuggestionCount, searchValue, searchInDescriptions]);

    useLayoutEffect(() => {
        if (keyboardHeight === undefined) return;

        parentRef.current?.measureInWindow((_ix, inputY, _iw, inputHeight) => {
            containerRef.current?.measureInWindow((_px, _py, _pw, panelHeight) => {
                const size = inputY + inputHeight + panelHeight;
                const screenMaxHeight = screenHeight - keyboardHeight - top;

                setLayout({
                    inputHeight: inputHeight,
                    inverted: size > screenMaxHeight,
                });
            });
        });
    }, [keyboardHeight, screenHeight, displayItems.length, parentRef, top]);

    if (!(visible && displayItems.length)) return;

    return (
        <View ref={containerRef} style={styles.dropdownPanel}>
            <BlurView intensity={75} tint="default" style={styles.itemsContainer}>
                {displayItems.map(item => (
                    <DropdownItem
                        key={"id" in item ? item.id : item.value}
                        item={item}
                        searchValue={searchValue}
                        hideItemDescriptions={hideItemDescriptions}
                        onPress={() => onSelect(item)}
                    />
                ))}
            </BlurView>
        </View>
    );
};

const createStyles = (
    { styles: { dropdownInput, baseInput }, theme: { color } }: ThemedStyles,
    panelLayout: PanelLayout | undefined,
) => {
    const styles = StyleSheet.create({
        dropdownPanel: {
            position: "absolute",
            bottom: panelLayout?.inverted ? panelLayout.inputHeight : undefined,
            opacity: panelLayout ? 1 : 0,
            zIndex: 10,
            width: "100%",
        },
        itemsContainer: {
            overflow: "hidden",
            marginTop: panelLayout?.inverted ? undefined : dropdownInput.panelGap,
            marginBottom: panelLayout?.inverted ? dropdownInput.panelGap : undefined,
            borderColor: color.inputBackground,
            borderRadius: baseInput.borderRadius,
            borderWidth: 2,
        },
    });
    return styles;
};
