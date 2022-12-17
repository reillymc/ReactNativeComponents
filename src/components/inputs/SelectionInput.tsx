import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { InputWidth } from ".";
import { ThemedStyles, useThemedStyles } from "../../hooks";
import { ModalHeader } from "../ModalHeader";
import { ModalSheet, ModalSheetFlatList } from "../ModalSheet";
import { Text } from "../Text";
import { BaseInput, BaseInputProps } from "./BaseInput";

export type SelectionInputStyles = {};

export type SelectionItem<T> = {
    label: string;
    value: T;
};

export interface SelectionInputProps<T extends {} = string> extends BaseInputProps {
    placeholder?: string;
    // variant?: Exclude<ActionVariant, "destructive">;
    width?: InputWidth;
    disabled?: boolean;
    items?: Array<SelectionItem<T>>;
    selectedItem?: SelectionItem<T>;
    style?: StyleProp<ViewStyle>;
    onSelect: (item: SelectionItem<T>) => void;
}

export const SelectionInput = <T extends {} = string>({
    label,
    // variant = "primary",
    width = "full",
    disabled,
    items = [],
    selectedItem,
    placeholder,
    style,
    onSelect,
}: SelectionInputProps<T>) => {
    const [showOptions, setShowOptions] = React.useState(false);

    const styles = useThemedStyles(createStyles, { width, disabled });

    const handleItemPress = (item: SelectionItem<T>) => {
        setShowOptions(false);
        onSelect(item);
    };

    return (
        <BaseInput
            label={label}
            inputElement={
                <Pressable
                    hitSlop={20}
                    disabled={disabled}
                    style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : undefined, style]}
                    onPress={() => setShowOptions(true)}
                >
                    {() => (
                        <View style={styles.container}>
                            <Text style={disabled ? styles.labelDisabled : undefined}>
                                {selectedItem?.label ?? placeholder}
                            </Text>
                            <AntDesign name="down" style={styles.icon} />
                        </View>
                    )}
                </Pressable>
            }
            modalElement={
                <ModalSheet height="mid" onClose={() => setShowOptions(false)} show={showOptions}>
                    <ModalSheetFlatList
                        ListHeaderComponent={<ModalHeader heading={label} />}
                        data={items}
                        renderItem={({ item, index }) => (
                            <Pressable
                                key={index}
                                onPress={() => handleItemPress(item)}
                                style={{
                                    borderRadius: 5,
                                    marginVertical: 2,
                                    padding: 10,
                                }}
                            >
                                {selectedItem?.value === item.value ? (
                                    <Text>{item.label}</Text>
                                ) : (
                                    <Text>{item.label}</Text>
                                )}
                            </Pressable>
                        )}
                    />
                </ModalSheet>
            }
        />
    );
};

SelectionInput.displayName = "SelectionInput";

const createStyles = (
    { styles: { baseInput }, theme }: ThemedStyles,
    { width = "full", disabled }: Partial<SelectionInputProps>,
) => {
    // const backgroundColor = {
    //     primary: theme.color.grey200,
    //     secondary: theme.color.grey200,
    //     flat: "transparent",
    // }[variant];

    // const backgroundColorPressed = {
    //     primary: theme.color.grey600,
    //     secondary: theme.color.grey600,
    //     flat: theme.color.grey600,
    // }[variant];

    // const color = {
    //     primary: theme.color.textPrimary,
    //     secondary: theme.color.textPrimary,
    //     flat: theme.color.textInverted,
    // }[variant];

    // const colorPressed = {
    //     primary: theme.color.textHighlight,
    //     secondary: theme.color.textHighlight,
    //     flat: theme.color.textInverted,
    // }[variant];

    return StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: baseInput.padding, //variant !== "flat" ? common.input.padding : 0,
            alignItems: "center",
        },
        button: {
            justifyContent: "center",
            borderRadius: baseInput.borderRadius,
            width: baseInput.width[width],
            minWidth: baseInput.width[width],
            height: baseInput.height,
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : baseInput.backgroundColor,
            color: disabled ? baseInput.disabledTextColor : baseInput.textColor,
            padding: baseInput.padding,
            fontSize: baseInput.fontSize,
        },
        buttonPressed: {
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : theme.color.backgroundHighlight,
            color: disabled ? baseInput.disabledTextColor : theme.color.textHighlight,
        },
        labelDisabled: {
            color: baseInput.disabledTextColor,
        },
        icon: {
            color: disabled ? baseInput.disabledTextColor : baseInput.textColor,
        },
    });
};
