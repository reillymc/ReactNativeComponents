import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../../../hooks";
import { HighlightedText } from "../../HighlightedText";

export type DropdownItem = {
    label: string;
    value: string;
};

interface DropdownItemProps {
    item: DropdownItem;
    searchValue?: string;
    onPress: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ item, searchValue, onPress }) => {
    const {
        theme: { color },
    } = useTheme();

    const styles = useThemedStyles(createStyles, {});

    return (
        <Pressable
            key={item.value}
            onPress={onPress}
            style={({ pressed }) => [
                styles.dropdownItem,
                {
                    backgroundColor: pressed ? color.pressOverlay : "transparent",
                },
            ]}
        >
            <HighlightedText text={item.label} highlight={searchValue} />
        </Pressable>
    );
};

DropdownItem.displayName = "DropdownItem";

const createStyles = ({ styles: { baseInput } }: ThemedStyles, {}: Partial<DropdownItemProps>) =>
    StyleSheet.create({
        dropdownItem: {
            padding: baseInput.padding,
            paddingVertical: 10,
            borderRadius: baseInput.borderRadius / 2,
        },
    });
