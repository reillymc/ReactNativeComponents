import React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";

import { ThemedStyles, useKeyboardHeight, useTheme, useThemedStyles } from "../../../hooks";
import { FloatingContainer } from "../../FloatingContainer";
import { DropdownInputProps } from "./DropdownInput";
import { DropdownItem } from ".";

export interface DropdownPanelProps {
    items: DropdownInputProps["items"];
    searchValue: string;
    maxSuggestionCount: number;
    visible: boolean;
    onSelect: DropdownInputProps["onSelect"];
}

export const DropdownPanel: React.FC<DropdownPanelProps> = ({
    items = [],
    maxSuggestionCount,
    searchValue,
    visible,
    onSelect,
}) => {
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
                    if (!inverted) setInverted(true);
                } else {
                    setLayout({ x: viewX, y: viewY, width: viewWidth });
                }
            });
        });
    }, [viewRef.current, containerRef.current, keyboardHeight, searchValue, inverted]);

    let displayItems = items
        .filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, maxSuggestionCount);
    displayItems = !inverted ? displayItems.reverse() : displayItems;

    return (
        <View ref={viewRef} style={{ display: "flex" }}>
            <FloatingContainer
                ref={containerRef}
                position={{ x: layout?.x, y: layout?.y }}
                align={inverted ? "bottom" : "top"}
                style={[{ opacity: visible ? 0.9 : 0, width: layout?.width }, styles.dropdownContainer]}
            >
                {visible &&
                    displayItems.map(item => (
                        <DropdownItem
                            key={item.value}
                            item={item}
                            searchValue={searchValue}
                            onPress={() => onSelect(item)}
                        />
                    ))}
            </FloatingContainer>
        </View>
    );
};

const createStyles = ({ styles: { dropdownInput, baseInput } }: ThemedStyles, {}: Partial<DropdownInputProps>) =>
    StyleSheet.create({
        dropdownContainer: {
            marginTop: dropdownInput.dropdownMarginTop,
            backgroundColor: baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
            overflow: "hidden",
        },
    });
