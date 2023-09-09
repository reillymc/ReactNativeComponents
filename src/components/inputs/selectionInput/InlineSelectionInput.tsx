import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedStyles, useThemedStyles } from "../../../hooks";
import { Tag, TagProps } from "../../Tag";
import { Text } from "../../Text";
import { BaseInput } from "../BaseInput";
import { ValueItem } from "../valueItem";

import { SelectionInputProps } from "./SelectionInput";
import { SelectionPanel } from "./SelectionPanel";

export type InlineSelectionInputProps<T = string> = SelectionInputProps<T> & Pick<TagProps, "variant">;

export const InlineSelectionInput = <T,>({
    label,
    width,
    disabled,
    items = [],
    variant,
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
                <ScrollView
                    contentContainerStyle={[styles.container, style]}
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
            }
            modalElement={
                <SelectionPanel
                    show={showOptions}
                    items={items}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    selectionMode={selectionMode as any}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    selection={selection as any}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={onChange as any}
                    onClose={() => setShowOptions(false)}
                />
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
            flexWrap: "wrap",
            marginVertical: 4,
            paddingHorizontal: baseInput.padding,
        },
        labelDisabled: {
            color: baseInput.disabledTextColor,
        },
        labelContainer: {
            marginRight: baseInput.padding,
            justifyContent: "center",
        },
        tag: {
            marginVertical: 2,
        },
    });
    return styles;
};
