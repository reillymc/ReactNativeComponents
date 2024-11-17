import { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

import { type ThemedStyles, useKeyboardHeight, useTheme, useThemedStyles } from "../../../hooks";
import type { ValueItem } from "../valueItem";

import { BlurView } from "expo-blur";
import { DropdownItem } from "./DropdownItem";

export interface DropdownPanelProps<T = string> {
    items: Array<ValueItem<T>>;
    searchValue: string;
    maxSuggestionCount?: number;
    visible: boolean;
    hideItemDescriptions?: boolean;
    searchInDescriptions?: boolean;
    onSelect: (e: ValueItem<T> | undefined, automated?: boolean) => void;
}

export const DropdownPanel = <T,>({
    items = [],
    maxSuggestionCount = 5,
    searchValue,
    visible,
    hideItemDescriptions,
    searchInDescriptions,
    onSelect,
}: DropdownPanelProps<T>) => {
    const containerRef = useRef<View>(null);

    const [layout, setLayout] = useState<{
        height: number;
    }>();

    const [inverted, setInverted] = useState(false);
    const styles = useThemedStyles(createStyles, {
        inverted,
        height: layout?.height,
    });
    const {
        styles: { baseInput, dropdownInput },
    } = useTheme();

    const { height: screenHeight } = useWindowDimensions();
    const { keyboardHeight } = useKeyboardHeight();

    useLayoutEffect(() => {
        containerRef.current?.measure((_cx, _cy, _cw, containerHeight, _pageX, pageY) => {
            setLayout({ height: containerHeight });

            if (inverted) {
                const remainInverted = pageY + containerHeight > screenHeight - keyboardHeight - 100;

                if (remainInverted) return;

                setInverted(false);
                return;
            }

            const shouldInvert = pageY > screenHeight - keyboardHeight - 200;

            if (shouldInvert) {
                setInverted(true);
            }
        });
    }, [
        keyboardHeight,
        searchValue,
        maxSuggestionCount,
        screenHeight,
        inverted,
        dropdownInput.dropdownMarginTop,
        baseInput.height,
    ]);

    let displayItems = items
        .filter(
            ({ label, description }) =>
                label.toLowerCase().includes(searchValue.toLowerCase()) ||
                (searchInDescriptions && description && description.toLowerCase().includes(searchValue.toLowerCase())),
        )
        .slice(0, maxSuggestionCount);
    displayItems = inverted ? displayItems : displayItems.reverse();

    if (!(visible && displayItems.length)) return;

    return (
        <View ref={containerRef} style={styles.dropdownContainer}>
            <BlurView intensity={75} tint={"default"}>
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
    { inverted, height = 0 }: { inverted: boolean; height: number | undefined },
) => {
    const styles = StyleSheet.create({
        dropdownContainer: {
            marginTop: inverted ? undefined : dropdownInput.dropdownMarginTop,
            borderRadius: baseInput.borderRadius,
            overflow: "hidden",
            position: "absolute",
            top: inverted ? -(height + baseInput.height + dropdownInput.dropdownMarginTop) : undefined,
            zIndex: 10,
            width: "100%",
            borderColor: color.inputBackground,
            borderWidth: 2,
        },
    });
    return styles;
};
