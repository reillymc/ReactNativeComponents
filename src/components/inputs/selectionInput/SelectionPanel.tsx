import { BlurView } from "expo-blur";
import React from "react";
import { FlatList, StyleSheet, View, useColorScheme } from "react-native";

import { ThemedStyles, useThemedStyles } from "../../../hooks";
import { Tag } from "../../Tag";
import { Text } from "../../Text";
import { Action, IconActionV2 } from "../../buttons";
import { ModalHeader, ModalSheet, ModalSheetFlatList, ModalSheetProps } from "../../modal";
import { BaseInputProps } from "../BaseInput";
import { DropdownItem } from "../dropdownInput";
import { ValueItem } from "../valueItem";

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
    const colorScheme = useColorScheme();

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
            height={["mid", "full"]}
            onClose={onClose}
            show={show}
            header={
                <ModalHeader
                    leftItem={<Text variant="heading">{label}</Text>}
                    rightItem={<IconActionV2 iconName="x" variant="flat" onPress={onClose} />}
                />
            }
            footer={
                selectionMode === "multi" ? (
                    <BlurView
                        intensity={100}
                        tint={colorScheme === "light" ? "extraLight" : "systemMaterialDark"}
                        style={styles.selectionDisplay}
                    >
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => "id" in item ? item.id : item.value.toString()}
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
                        {!!selectedItems.length && (
                            <View style={styles.clearButton}>
                                <Action label="Clear" onPress={() => onChange?.([])} />
                            </View>
                        )}
                    </BlurView>
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

const createStyles = ({ styles: { baseInput }, theme: { padding, color } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        tag: {
            marginVertical: 2,
        },
        pickerContainer: {
            paddingHorizontal: padding.pageHorizontal,
        },
        selectionDisplay: {
            flexDirection: "row",
            marginHorizontal: padding.pageHorizontal - baseInput.padding,
            borderRadius: 50,
            marginBottom: 40,
            overflow: "hidden",
        },
        previewTagContainer: {
            paddingLeft: baseInput.padding,
            paddingVertical: padding.tiny,
            height: 48,
        },
        previewPlaceholder: {
            alignSelf: "center",
            paddingLeft: baseInput.padding,
        },
        clearButton: {
            paddingHorizontal: padding.pageHorizontal,
            marginVertical: padding.tiny + 2,
            borderLeftColor: color.border,
            borderLeftWidth: 1,
            justifyContent: "center",
        },
    });
    return styles;
};
