import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedStyles, useTheme, useThemedStyles } from "../../../hooks";
import { HighlightedText } from "../../HighlightedText";
import { ValueItem } from "../valueItem";

interface DropdownItemProps<T = string> {
    item: ValueItem<T>;
    searchValue?: string;
    hideItemDescriptions?: boolean;
    onPress: () => void;
}

export const DropdownItem = <T,>({ item, searchValue, hideItemDescriptions, onPress }: DropdownItemProps<T>) => {
    const {
        theme: { color },
    } = useTheme();

    const styles = useThemedStyles(createStyles, {});

    return (
        <Pressable
            key={"id" in item ? item.id : item.value}
            onPress={onPress}
            style={({ pressed }) => [
                styles.dropdownItem,
                {
                    backgroundColor: pressed ? color.pressOverlay : "transparent",
                },
            ]}
        >
            <HighlightedText text={item.label} highlight={searchValue} />
            {!hideItemDescriptions && item.description && (
                <HighlightedText variant="caption" text={item.description} highlight={searchValue} />
            )}
        </Pressable>
    );
};

DropdownItem.displayName = "DropdownItem";

const createStyles = ({ styles: { baseInput } }: ThemedStyles, _: Partial<DropdownItemProps>) => {
    const styles = StyleSheet.create({
        dropdownItem: {
            padding: baseInput.padding,
            paddingVertical: 10,
            borderRadius: baseInput.borderRadius / 2,
        },
    });
    return styles;
};
