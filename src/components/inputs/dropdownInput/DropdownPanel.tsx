import React from "react";
import { View, useWindowDimensions, Keyboard, StyleSheet } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../../../hooks";
import { FloatingContainer } from "../../FloatingContainer";
import { DropdownInputProps } from "./DropdownInput";
import { DropdownItem } from ".";

export interface DropdownPanelProps {
    items: DropdownInputProps["items"];
    width: DropdownInputProps["width"];
    searchValue: string;
    maxSuggestionCount: number;
    visible: boolean;
    onSelect: DropdownInputProps["onSelect"];
}

export const DropdownPanel: React.FC<DropdownPanelProps> = ({
    items = [],
    width,
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
    }>();

    const [inverted, setInverted] = React.useState(false);
    const styles = useThemedStyles(createStyles, { width });
    const {
        styles: { baseInput, dropdownInput },
    } = useTheme();

    const { height: screenHeight } = useWindowDimensions();
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    React.useEffect(() => {
        const showListener = Keyboard.addListener("keyboardWillShow", e => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hideListener = Keyboard.addListener("keyboardWillHide", () => {
            setKeyboardHeight(0);
        });
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    React.useLayoutEffect(() => {
        viewRef.current?.measure((_vx, _vy, _vw, _vh, viewX, viewY) => {
            containerRef.current?.measure((_cx, _cy, _cw, containerHeight) => {
                if (inverted || viewY + (containerHeight || 35 * maxSuggestionCount) > screenHeight - keyboardHeight) {
                    setLayout({
                        x: viewX,
                        y: screenHeight - viewY + (dropdownInput.dropdownMarginTop + baseInput.height),
                    });
                    if (!inverted) setInverted(true);
                } else {
                    setLayout({ x: viewX, y: viewY });
                }
            });
        });
    }, [viewRef.current, containerRef.current, keyboardHeight, searchValue, inverted]);

    let displayItems = items
        .filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, maxSuggestionCount);
    displayItems = !inverted ? displayItems.reverse() : displayItems;

    return (
        <View ref={viewRef} style={{ display: "flex", flexDirection: "column" }}>
            <FloatingContainer
                ref={containerRef}
                position={{ ...layout, inverted }}
                style={[{ opacity: visible ? 0.9 : 0 }, styles.dropdownContainer]}
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

const createStyles = (
    { styles: { dropdownInput, baseInput } }: ThemedStyles,
    { width = "full" }: Partial<DropdownInputProps>,
) =>
    StyleSheet.create({
        dropdownContainer: {
            marginTop: dropdownInput.dropdownMarginTop,
            backgroundColor: baseInput.backgroundColor,
            width: baseInput.width[width],
            borderRadius: baseInput.borderRadius,
            overflow: "hidden",
        },
    });
