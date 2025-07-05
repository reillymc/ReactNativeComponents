import {
    Pressable,
    ScrollView,
    type StyleProp,
    StyleSheet,
    type ViewStyle,
} from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../../hooks";
import { Tag, type TagProps } from "../../Tag";
import { Text } from "../../text";
import { BaseInput } from "../BaseInput";
import type { SelectionInputProps } from "./SelectionInput";

export type InlineSelectionInputProps<T = string> = SelectionInputProps<T> &
    Pick<TagProps, "variant"> & {
        scrollContainerStyles?: StyleProp<ViewStyle>;
    };

export const InlineSelectionInput = <T,>({
    label,
    width,
    disabled,
    items = [],
    variant,
    selectionMode,
    selection,
    scrollContainerStyles,
    onAdd,
    onRemoveItem,
    ...props
}: InlineSelectionInputProps<T>) => {
    const styles = useThemedStyles(createStyles, {
        disabled,
        selectionMode,
        variant,
    });

    const addButton = (
        <Tag
            iconName="plus"
            variant={variant}
            onPress={disabled ? undefined : onAdd}
        />
    );

    return (
        <BaseInput
            width={width}
            {...props}
            inputElement={
                <ScrollView
                    contentContainerStyle={[
                        styles.container,
                        scrollContainerStyles,
                    ]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={selectionMode === "multi"}
                >
                    {label && (
                        <Pressable
                            style={styles.labelContainer}
                            onPress={disabled ? undefined : onAdd}
                        >
                            {typeof label === "string" ? (
                                <Text variant="label">{label}</Text>
                            ) : (
                                label
                            )}
                        </Pressable>
                    )}
                    {selectionMode === "single" ? (
                        <Text
                            style={disabled ? styles.labelDisabled : undefined}
                        >
                            {selection ? (
                                <Tag
                                    key={`${selection?.value}`}
                                    label={selection?.label}
                                    iconName="closecircle"
                                    style={styles.tag}
                                    variant={variant}
                                    onPress={
                                        disabled
                                            ? undefined
                                            : () => onRemoveItem?.(selection)
                                    }
                                />
                            ) : (
                                addButton
                            )}
                        </Text>
                    ) : (
                        <>
                            {selection?.map((item) => (
                                <Tag
                                    key={`${item.value}`}
                                    label={item.label}
                                    iconName="closecircle"
                                    style={styles.tag}
                                    variant={variant}
                                    onPress={
                                        disabled
                                            ? undefined
                                            : () => onRemoveItem?.(item)
                                    }
                                />
                            ))}
                            {addButton}
                        </>
                    )}
                </ScrollView>
            }
        />
    );
};

InlineSelectionInput.displayName = "InlineSelectionInput";

const createStyles = (
    { styles: { baseInput } }: ThemedStyles,
    { disabled, selectionMode, variant }: Partial<InlineSelectionInputProps>,
) => {
    const backgroundColor =
        variant === "dark" ? baseInput.backgroundColor : undefined;
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: baseInput.borderRadius,
            minHeight: baseInput.height,
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : backgroundColor,
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
