import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { InputWidth } from ".";
import { ThemedStyles, useThemedStyles } from "../../hooks";
import { ActionVariant } from "../buttons";
import { ModalSheet } from "../ModalSheet";
import { Text } from "../Text";

export type SelectionInputStyles = {};

export type SelectionItem<T> = {
    label: string;
    value: T;
};

export interface SelectionInputProps<T extends {} = string> {
    label?: string;
    placeholder?: string;
    variant?: Exclude<ActionVariant, "destructive">;
    width?: InputWidth;
    disabled?: boolean;
    items?: Array<SelectionItem<T>>;
    selectedItem?: SelectionItem<T>;
    style?: StyleProp<ViewStyle>;
    onSelect: (item: SelectionItem<T>) => void;
}

export const SelectionInput = <T extends {} = string>({
    label,
    variant = "primary",
    width = "full",
    disabled,
    items = [],
    selectedItem,
    placeholder,
    style,
    onSelect,
}: SelectionInputProps<T>) => {
    const [showOptions, setShowOptions] = React.useState(false);

    const styles = useThemedStyles(createStyles, { variant, width, disabled });

    const handleItemPress = (item: SelectionItem<T>) => {
        setShowOptions(false);
        onSelect(item);
    };

    return (
        <>
            <Pressable
                hitSlop={20}
                disabled={disabled}
                style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : undefined, style]}
                onPress={() => setShowOptions(true)}
            >
                {() => (
                    <Text style={[styles.label, disabled ? styles.labelDisabled : undefined]}>
                        {selectedItem?.label ?? placeholder}
                    </Text>
                )}
            </Pressable>
            <ModalSheet height="mid" onClose={() => setShowOptions(false)} show={showOptions}>
                {!!label && <Text variant="heading">{label}</Text>}
                {items.map((item, idx) => (
                    // TODO extract to styled component
                    <Pressable
                        key={idx}
                        onPress={() => handleItemPress(item)}
                        style={{
                            borderRadius: 5,
                            marginVertical: 2,
                            padding: 10,
                        }}
                    >
                        {selectedItem?.value === item.value ? <Text>{item.label}</Text> : <Text>{item.label}</Text>}
                    </Pressable>
                ))}
            </ModalSheet>
        </>
    );
};

SelectionInput.displayName = "SelectionInput";

const createStyles = (
    { styles: { common }, theme }: ThemedStyles,
    { width = "full", variant = "primary", disabled }: Partial<SelectionInputProps>,
) => {
    const backgroundColor = {
        primary: theme.color.grey200,
        secondary: theme.color.grey200,
        flat: "transparent",
    }[variant];

    const backgroundColorPressed = {
        primary: theme.color.grey600,
        secondary: theme.color.grey600,
        flat: theme.color.grey600,
    }[variant];

    const color = {
        primary: theme.color.textPrimary,
        secondary: theme.color.textPrimary,
        flat: theme.color.textInverted,
    }[variant];

    const colorPressed = {
        primary: theme.color.textHighlight,
        secondary: theme.color.textHighlight,
        flat: theme.color.textInverted,
    }[variant];

    return StyleSheet.create({
        button: {
            justifyContent: "center",
            borderRadius: common.input.borderRadius,
            width: common.input.width[width],
            minWidth: common.input.width[width],
            height: common.input.height,
            backgroundColor: disabled ? common.input.backgroundColorDisabled : backgroundColor,
            color: disabled ? common.input.textColorDisabled : color,
            padding: common.input.padding,
            fontSize: common.input.fontSize,
        },
        buttonPressed: {
            backgroundColor: disabled ? common.input.backgroundColorDisabled : backgroundColorPressed,
            color: colorPressed,
        },
        label: {
            fontFamily: common.input.fontFamilyWeight,
            paddingHorizontal: variant !== "flat" ? common.input.padding : 0,
            color: common.input.textColor,
        },
        labelDisabled: {
            color: common.input.textColorDisabled,
        },
    });
};
