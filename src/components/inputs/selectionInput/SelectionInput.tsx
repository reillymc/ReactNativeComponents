import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ThemedStyles, useThemedStyles } from "../../../hooks";
import { Tag } from "../../Tag";
import { Text } from "../../Text";
import { BaseInput, BaseInputProps } from "../BaseInput";

import { SelectionPanel, SelectionPanelProps } from "./SelectionPanel";

export interface SelectionInputStyles {}

export type SelectionInputProps<T = string> = Omit<BaseInputProps, "selection" | "onChange"> & SelectionPanelProps<T>;

export const SelectionInput = <T,>({
    label,
    width,
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

    const styles = useThemedStyles(createStyles, { disabled, selectionMode });

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
    });
    return styles;
};
