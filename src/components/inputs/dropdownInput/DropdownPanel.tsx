import React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";

import { ThemedStyles, useKeyboardHeight, useTheme, useThemedStyles } from "../../../hooks";
import { FloatingContainer } from "../../FloatingContainer";
import { ValueItem } from "../valueItem";

import { DropdownItem } from "./DropdownItem";

export interface DropdownPanelProps<T = string> {
    items: Array<ValueItem<T>>;
    searchValue: string;
    maxSuggestionCount: number;
    visible: boolean;
    hideItemDescriptions?: boolean;
    searchInDescriptions?: boolean;
    onSelect: (e: ValueItem<T> | undefined, automated?: boolean) => void;
}

export const DropdownPanel = <T,>({
    items = [],
    maxSuggestionCount,
    searchValue,
    visible,
    hideItemDescriptions,
    searchInDescriptions,
    onSelect,
}: DropdownPanelProps<T>) => {
    const viewRef = React.useRef<View>(null);
    const containerRef = React.useRef<View>(null);

    const [layout, setLayout] = React.useState<{
        x: number;
        y: number;
        width: number;
    }>();

    const [inverted, setInverted] = React.useState(false);
    const styles = useThemedStyles(createStyles, {});
    const {
        styles: { baseInput, dropdownInput },
    } = useTheme();

    const { height: screenHeight } = useWindowDimensions();
    const { keyboardHeight } = useKeyboardHeight();

    React.useLayoutEffect(() => {
        viewRef.current?.measure((_vx, _vy, viewWidth, _vh, viewX, viewY) => {
            containerRef.current?.measure((_cx, _cy, _cw, containerHeight) => {
                if (inverted || viewY + (containerHeight || 35 * maxSuggestionCount) > screenHeight - keyboardHeight) {
                    setLayout({
                        x: viewX,
                        y: screenHeight - viewY + (dropdownInput.dropdownMarginTop + baseInput.height),
                        width: viewWidth,
                    });
                    if (!inverted) {
                        setInverted(true);
                    }
                } else {
                    setLayout({ x: viewX, y: viewY, width: viewWidth });
                }
            });
        });
    }, [
        keyboardHeight,
        searchValue,
        inverted,
        maxSuggestionCount,
        screenHeight,
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
    displayItems = !inverted ? displayItems.reverse() : displayItems;

    return (
        <View ref={viewRef} style={{ display: "flex" }}>
            <FloatingContainer
                ref={containerRef}
                position={{ x: layout?.x, y: layout?.y }}
                align={inverted ? "bottom" : "top"}
                visible={visible}
                style={[{ opacity: visible ? 0.95 : 0, width: layout?.width }, styles.dropdownContainer]}
            >
                {visible &&
                    displayItems.map(item => (
                        <DropdownItem
                            key={"id" in item ? item.id : item.value}
                            item={item}
                            searchValue={searchValue}
                            hideItemDescriptions={hideItemDescriptions}
                            onPress={() => onSelect(item)}
                        />
                    ))}
            </FloatingContainer>
        </View>
    );
};

const createStyles = ({ styles: { dropdownInput, baseInput } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        dropdownContainer: {
            marginTop: dropdownInput.dropdownMarginTop,
            backgroundColor: baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
            overflow: "hidden",
        },
    });
    return styles;
};
