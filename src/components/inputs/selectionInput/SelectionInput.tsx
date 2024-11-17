import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { useThemedStyles, type ThemedStyles } from "../../../hooks";
import { Tag } from "../../Tag";
import { Text } from "../../Text";
import { BaseInput, type BaseInputProps } from "../BaseInput";
import type { ValueItem } from "../valueItem";

export interface SelectionInputStyles {}

interface SingleSelection<T> {
    selectionMode: "single";
    selection?: ValueItem<T>;
}

interface MultiSelection<T> {
    selectionMode: "multi";
    selection?: Array<ValueItem<T>>;
}

export type SelectionProps<T = string> = Pick<BaseInputProps, "label" | "placeholder"> &
    (SingleSelection<T> | MultiSelection<T>) & { items?: Array<ValueItem<T>> };

export type SelectionInputProps<T = string> = Omit<BaseInputProps, "selection" | "onChange" | "style"> &
    SelectionProps<T> & {
        hideLabel?: boolean;
        onRemoveItem?: (item: ValueItem<T> | undefined) => void;
        onAdd?: () => void;
    };

export const SelectionInput = <T,>({
    label,
    width,
    disabled,
    items,
    placeholder,
    hideLabel,
    selectionMode,
    selection,
    onAdd,
    ...props
}: SelectionInputProps<T>) => {
    const styles = useThemedStyles(createStyles, { disabled, selectionMode });

    return (
        <BaseInput
            label={!hideLabel && label}
            width={width}
            {...props}
            inputElement={
                <Pressable
                    hitSlop={20}
                    disabled={disabled}
                    style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : undefined]}
                    onPress={onAdd}
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
                                            <Tag
                                                key={"id" in item ? item.id : item.value}
                                                label={item.label}
                                                style={styles.tag}
                                            />
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
