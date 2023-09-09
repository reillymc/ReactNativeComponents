import React from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedStyles, useThemedStyles } from "../../hooks";
import { ModalHeader, ModalSheet, ModalSheetFlatList } from "../modal";
import { Tag, TagProps } from "../Tag";
import { Text } from "../Text";
import { Action } from "../buttons";

import { BaseInput } from "./BaseInput";
import { DropdownItem } from "./dropdownInput";
import { ValueItem } from "./valueItem";
import { SelectionInputProps } from "./SelectionInput";

export type InlineSelectionInputProps<T = string> = SelectionInputProps<T> & Pick<TagProps, "variant">;

export const InlineSelectionInput = <T,>({
    label,
    width,
    disabled,
    items = [],
    variant,
    placeholder,
    style,
    selectionMode,
    selection,
    onChange,
    ...props
}: InlineSelectionInputProps<T>) => {
    const [showOptions, setShowOptions] = React.useState(false);

    const selectedItems = (selection && (selectionMode === "single" ? [selection] : selection)) ?? [];

    const styles = useThemedStyles(createStyles, { disabled, selectionMode, variant });

    const handleItemPress = (item: ValueItem<T>) => {
        if (selectionMode === "single") {
            onChange?.(selection?.value === item.value ? undefined : item);
            setShowOptions(false);
        } else {
            onChange?.(
                selectedItems.some(selectedItem => selectedItem.value === item.value)
                    ? selectedItems.filter(selectedItem => selectedItem.value !== item.value)
                    : [...selectedItems, item],
            );
        }
    };

    const addButton = (
        <Tag iconName="plus" variant={variant} onPress={disabled ? undefined : () => setShowOptions(true)} />
    );

    return (
        <BaseInput
            width={width}
            {...props}
            inputElement={
                <View style={[styles.container, style]}>
                    <ScrollView
                        contentContainerStyle={styles.tagContainer}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={selectionMode === "multi"}
                    >
                        {label && (
                            <Pressable
                                style={styles.labelContainer}
                                onPress={disabled ? undefined : () => setShowOptions(true)}
                            >
                                {typeof label === "string" ? <Text variant="label">{label}</Text> : label}
                            </Pressable>
                        )}
                        {selectionMode === "single" ? (
                            <Text style={disabled ? styles.labelDisabled : undefined}>
                                {selection ? (
                                    <Tag
                                        key={`${selection?.value}`}
                                        label={selection?.label}
                                        iconName="closecircle"
                                        style={styles.tag}
                                        variant={variant}
                                        onPress={disabled ? undefined : () => handleItemPress(selection)}
                                    />
                                ) : (
                                    addButton
                                )}
                            </Text>
                        ) : (
                            <>
                                {selection?.map(item => (
                                    <Tag
                                        key={`${item.value}`}
                                        label={item.label}
                                        iconName="closecircle"
                                        style={styles.tag}
                                        variant={variant}
                                        onPress={disabled ? undefined : () => handleItemPress(item)}
                                    />
                                ))}
                                {addButton}
                            </>
                        )}
                    </ScrollView>
                </View>
            }
            modalElement={
                <ModalSheet
                    height="mid"
                    onClose={() => setShowOptions(false)}
                    show={showOptions}
                    header={
                        <ModalHeader
                            heading={label}
                            leftItem={<Action label="Close" onPress={() => setShowOptions(false)} />}
                        />
                    }
                    footer={
                        selectionMode === "multi" && (
                            <View style={styles.selectionDisplay}>
                                <View>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={item => `${item.value}`}
                                        data={selection}
                                        contentContainerStyle={styles.previewTagContainer}
                                        ListEmptyComponent={
                                            <Text style={styles.previewPlaceholder}>{placeholder}</Text>
                                        }
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
                                searchValue={
                                    selectedItems.find(selectedItem => selectedItem.value === item.value)?.label
                                }
                                onPress={() => handleItemPress(item)}
                            />
                        )}
                    />
                </ModalSheet>
            }
        />
    );
};

InlineSelectionInput.displayName = "InlineSelectionInput";

const createStyles = (
    { styles: { baseInput } }: ThemedStyles,
    { disabled, selectionMode, variant }: Partial<InlineSelectionInputProps>,
) => {
    const backgroundColor = variant === "dark" ? baseInput.backgroundColor : undefined;
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: baseInput.borderRadius,
            minHeight: baseInput.height,
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : backgroundColor,
            color: disabled ? baseInput.disabledTextColor : baseInput.textColor,
            paddingVertical: selectionMode === "single" ? baseInput.padding : 0,
            fontSize: baseInput.fontSize,
        },
        labelDisabled: {
            color: baseInput.disabledTextColor,
        },
        labelContainer: {
            marginRight: baseInput.padding,
            justifyContent: "center",
        },
        tagContainer: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginVertical: 4,
            paddingHorizontal: baseInput.padding,
            alignItems: "center",
        },
        tag: {
            marginVertical: 2,
        },
        pickerContainer: {
            paddingHorizontal: 16,
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
            paddingLeft: 16,
            marginRight: 32,
            paddingRight: 32,
        },
        previewPlaceholder: {
            paddingTop: baseInput.padding,
        },
    });
    return styles;
};
