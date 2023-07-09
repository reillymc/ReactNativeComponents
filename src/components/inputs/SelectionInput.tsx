import React from "react";
import { FlatList, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useThemedStyles } from "../../hooks";
import { ModalHeader, ModalSheet, ModalSheetFlatList } from "../modal";
import { Tag } from "../Tag";
import { Text } from "../Text";
import { Action } from "../buttons";

import { BaseInput, BaseInputProps } from "./BaseInput";
import { DropdownItem } from "./dropdownInput";
import { ValueItem } from "./valueItem";

export interface SelectionInputStyles {}

export type SelectionInputProps<T = string> = Omit<BaseInputProps, "selection" | "onChange"> & {
    items?: Array<ValueItem<T>>;
    style?: StyleProp<ViewStyle>;
} & (SingleSelection<T> | MultiSelection<T>);

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

export const SelectionInput = <T,>({
    label,
    width = "full",
    disabled,
    items = [],
    placeholder,
    style,
    selectionMode,
    selection,
    onChange,
    ...props
}: SelectionInputProps<T>) => {
    const [showOptions, setShowOptions] = React.useState(false);

    const selectedItems = (selection && (selectionMode === "single" ? [selection] : selection)) ?? [];

    const styles = useThemedStyles(createStyles, { disabled, selectionMode });

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

    return (
        <BaseInput
            label={label}
            width={width}
            {...props}
            inputElement={
                <Pressable
                    hitSlop={20}
                    disabled={disabled}
                    style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : undefined, style]}
                    onPress={() => setShowOptions(true)}
                >
                    {() => (
                        <View style={styles.container}>
                            {selectionMode === "single" ? (
                                <Text style={disabled ? styles.labelDisabled : undefined}>
                                    {selection?.label ?? placeholder}
                                </Text>
                            ) : (
                                <View style={styles.tagContainer}>
                                    {selection?.length ? (
                                        selection?.map(item => (
                                            <Tag key={`${item.value}`} label={item.label} style={styles.tag} />
                                        ))
                                    ) : (
                                        <Text style={disabled ? styles.labelDisabled : undefined}>{placeholder}</Text>
                                    )}
                                </View>
                            )}
                            <AntDesign name="down" style={styles.icon} />
                        </View>
                    )}
                </Pressable>
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

SelectionInput.displayName = "SelectionInput";

const createStyles = (
    { styles: { baseInput }, theme: { color } }: ThemedStyles,
    { disabled, selectionMode }: Partial<SelectionInputProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: baseInput.padding,
            alignItems: "center",
        },
        button: {
            justifyContent: "center",
            borderRadius: baseInput.borderRadius,
            minHeight: baseInput.height,
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : baseInput.backgroundColor,
            color: disabled ? baseInput.disabledTextColor : baseInput.textColor,
            paddingHorizontal: baseInput.padding,
            paddingVertical: selectionMode === "single" ? baseInput.padding : 0,
            fontSize: baseInput.fontSize,
        },
        buttonPressed: {
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : color.backgroundHighlight,
            color: disabled ? baseInput.disabledTextColor : color.textHighlight,
        },
        labelDisabled: {
            color: baseInput.disabledTextColor,
        },
        icon: {
            color: disabled ? baseInput.disabledTextColor : baseInput.textColor,
        },
        tagContainer: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "92%",
            marginVertical: 4,
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
