import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ModalHeader, ModalSheet, ModalSheetFlatList, ModalSheetProps } from "../../modal";
import { Text } from "../../Text";
import { Action } from "../../buttons";
import { DropdownItem } from "../dropdownInput";
import { BaseInputProps } from "../BaseInput";
import { ValueItem } from "../valueItem";
import { Tag } from "../../Tag";
import { ThemedStyles, useThemedStyles } from "../../../hooks";

interface SingleSelection<T> {
    selectionMode: "single";
    selection?: ValueItem<T>;
    onChange?: (item: ValueItem<T> | undefined) => void;
}

interface MultiSelection<T> {
    selectionMode: "multi";
    selection?: Array<ValueItem<T>>;
    onChange?: (items: Array<ValueItem<T>>) => void;
}

export type SelectionPanelProps<T = string> = Pick<BaseInputProps, "label" | "placeholder"> &
    (SingleSelection<T> | MultiSelection<T>) & { items?: Array<ValueItem<T>> };

type InternalSelectionPanelProps<T> = Pick<ModalSheetProps, "onClose" | "show"> &
    SelectionPanelProps<T> & { singleFooter?: React.ReactNode };

export const SelectionPanel = <T,>({
    label,
    show,
    items = [],
    placeholder,
    selection,
    selectionMode,
    singleFooter,
    onChange,
    onClose,
}: InternalSelectionPanelProps<T>) => {
    const styles = useThemedStyles(createStyles, {});

    const selectedItems = (selection && (selectionMode === "single" ? [selection] : selection)) ?? [];

    const handleItemPress = (item: ValueItem<T>) => {
        if (selectionMode === "single") {
            onChange?.(selection?.value === item.value ? undefined : item);
            onClose();
        } else {
            onChange?.(
                selectedItems.some(selectedItem => selectedItem.value === item.value)
                    ? selectedItems.filter(selectedItem => selectedItem.value !== item.value)
                    : [...selectedItems, item],
            );
        }
    };

    return (
        <ModalSheet
            height="mid"
            onClose={onClose}
            show={show}
            header={<ModalHeader heading={label} leftItem={<Action label="Close" onPress={onClose} />} />}
            footer={
                selectionMode === "multi" ? (
                    <View style={styles.selectionDisplay}>
                        <View>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => `${item.value}`}
                                data={selection}
                                contentContainerStyle={styles.previewTagContainer}
                                ListEmptyComponent={<Text style={styles.previewPlaceholder}>{placeholder}</Text>}
                                renderItem={({ item }) => (
                                    <Tag
                                        label={item.label}
                                        style={styles.tag}
                                        variant="light"
                                        iconName="closecircle"
                                        onPress={() => handleItemPress(item)}
                                    />
                                )}
                            />
                        </View>
                    </View>
                ) : (
                    singleFooter
                )
            }
        >
            <ModalSheetFlatList
                data={items}
                contentContainerStyle={styles.pickerContainer}
                renderItem={({ item }) => (
                    <DropdownItem
                        key={"id" in item ? item.id : item.value}
                        item={item}
                        searchValue={selectedItems.find(selectedItem => selectedItem.value === item.value)?.label}
                        onPress={() => handleItemPress(item)}
                    />
                )}
            />
        </ModalSheet>
    );
};

SelectionPanel.displayName = "SelectionPanel";

const createStyles = ({ styles: { baseInput }, theme: { padding } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        tag: {
            marginVertical: 2,
        },
        pickerContainer: {
            paddingHorizontal: padding.pageHorizontal,
        },
        selectionDisplay: {
            justifyContent: "flex-start",
            height: 200,
            paddingHorizontal: 0,
            paddingTop: baseInput.padding,
            borderRadius: 0,
            backgroundColor: baseInput.backgroundColor,
            display: "flex",
            marginBottom: -120,
        },
        previewTagContainer: {
            paddingLeft: padding.pageHorizontal,
            marginRight: 32,
            paddingRight: 32,
        },
        previewPlaceholder: {
            paddingTop: baseInput.padding,
        },
    });
    return styles;
};
