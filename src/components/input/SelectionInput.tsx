import { type ColorValue, StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ValueItem } from "../../common";
import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { ActionBase } from "../action";
import { InteractiveIcon, type InteractiveIconStyles } from "../icon";
import { Tag } from "../tag";
import { Text } from "../text";
import type { InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";

export type SelectionInputState = "enabled" | "disabled" | "pressed";

export type SelectionInputStyles = {
    container: {
        backgroundColor: Record<SelectionInputState, ColorValue>;
    };
    selectionContainer: {
        gap: number;
    };
    icon: Pick<InteractiveIconStyles, "color">;
};

export type SelectionInputIcons = ComponentIconAssets<"showOptions">;

interface SingleSelection<T> {
    selectionMode: "single";
    value?: ValueItem<T>;
}

interface MultiSelection<T> {
    selectionMode: "multi";
    value?: Array<ValueItem<T>>;
}

export type SelectionProps<T = string> = Pick<InputBaseProps, "placeholder"> &
    (SingleSelection<T> | MultiSelection<T>) & { items?: Array<ValueItem<T>> };

export type SelectionInputProps<T = string> = Pick<
    InputBaseProps,
    "disabled" | "variant"
> &
    InputScaffoldFieldProps &
    SelectionProps<T> & {
        hideLabel?: boolean;
        style?: DeepPartial<SelectionInputStyles>;
        onChange?: (
            value: ValueItem<T> | Array<ValueItem<T>> | undefined,
        ) => void;
        onOpen?: () => void;
    };

const getItemKey = <T,>(item: ValueItem<T>) =>
    "id" in item ? item.id : item.value;

export const SelectionInput = <T,>({
    label,
    disabled: disabledProp,
    placeholder,
    hideLabel,
    selectionMode,
    value,
    style: styleOverrides,
    variant = "regular",
    onOpen,
    onChange,
    ...props
}: SelectionInputProps<T>) => {
    const disabled = disabledProp || !onOpen;
    const [styles, { style, icons }] = useThemedStyles(
        "selectionInput",
        createStyles,
        {
            styles: { selectionInput: styleOverrides },
            props: { disabled, variant },
        },
    );

    const hasSelection = selectionMode === "single" ? !!value : !!value?.length;

    const handleRemove = (item: ValueItem<T>) => {
        if (!onChange) return;

        if (selectionMode === "single") {
            onChange(undefined);
            return;
        }

        if (Array.isArray(value)) {
            onChange(
                value.filter(
                    (selectedItem) =>
                        getItemKey(selectedItem) !== getItemKey(item),
                ),
            );
        }
    };

    return (
        <InputScaffold label={!hideLabel && label} {...props}>
            <ActionBase
                disabled={disabled}
                containerStyle={({ pressed }) => [
                    styles.container,
                    pressed && styles.containerPressed,
                ]}
                onPress={onOpen}
            >
                {(pressableState) => (
                    <>
                        <View style={styles.selectionContainer}>
                            {selectionMode === "single" && !!value && (
                                <Text style={styles.selectionItemLabel}>
                                    {value.label}
                                </Text>
                            )}
                            {selectionMode === "multi" &&
                                !!value?.length &&
                                value.map((item) => (
                                    <Tag
                                        key={getItemKey(item)}
                                        label={item.label}
                                        onPress={
                                            onChange
                                                ? () => handleRemove(item)
                                                : undefined
                                        }
                                    />
                                ))}

                            {!hasSelection && (
                                <Text style={styles.placeholderText}>
                                    {placeholder}
                                </Text>
                            )}
                        </View>
                        <View style={styles.iconContainer}>
                            <InteractiveIcon
                                {...icons.showOptions}
                                disabled={disabled}
                                style={style.icon}
                                {...pressableState}
                            />
                        </View>
                    </>
                )}
            </ActionBase>
        </InputScaffold>
    );
};

SelectionInput.displayName = "SelectionInput";

const createStyles = (
    { styles: { inputBase, selectionInput } }: ThemedStyles,
    {
        disabled,
        variant,
    }: Required<Pick<SelectionInputProps, "disabled" | "variant">>,
) => {
    const { borderRadius, padding, height } = inputBase.container;

    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            minHeight: height[variant],
            borderRadius,
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
        },
        containerPressed: {
            backgroundColor: selectionInput.container.backgroundColor.pressed,
        },
        selectionContainer: {
            flex: 1,
            minWidth: 0,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: selectionInput.selectionContainer.gap,
            paddingStart: padding,
            marginVertical: padding,
        },
        selectionItemLabel: {
            color: inputBase.text.color[disabled ? "disabled" : "enabled"],
        },
        placeholderText: {
            color: inputBase.text.placeholderColor,
        },
        iconContainer: {
            width: height[variant],
            height: height[variant],
            alignItems: "center",
            justifyContent: "center",
        },
    });
};
