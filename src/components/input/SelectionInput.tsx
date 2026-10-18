import { type ColorValue, StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ValueItem } from "../../common";
import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { IconBase, type IconBaseStyles } from "../icon";
import { InteractionSurface } from "../surface";
import { Tag } from "../tag";
import { Text } from "../text";
import type { InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";

export type SelectionInputState = "enabled" | "disabled";

export type SelectionInputStyles = {
    container: {
        backgroundColor: Record<SelectionInputState, ColorValue>;
    };
    selectionContainer: {
        gap: number;
    };
    icon: Pick<IconBaseStyles, "color">;
};

export type SelectionInputIcons = ComponentIconAssets<"showOptions">;

interface SingleSelection<T> {
    selectionMode: "single";
    selection?: ValueItem<T>;
}

interface MultiSelection<T> {
    selectionMode: "multi";
    selection?: Array<ValueItem<T>>;
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
        onRemoveItem?: (item: ValueItem<T> | undefined) => void;
        onAdd?: () => void;
    };

export const SelectionInput = <T,>({
    label,
    disabled: disabledProp,
    placeholder,
    hideLabel,
    selectionMode,
    selection,
    style: styleOverrides,
    variant = "regular",
    onAdd,
    onRemoveItem,
    ...props
}: SelectionInputProps<T>) => {
    const disabled = disabledProp || !onAdd;
    const [styles, { style, icons }] = useThemedStyles(
        "selectionInput",
        createStyles,
        {
            styles: { selectionInput: styleOverrides },
            props: { disabled, variant },
        },
    );

    const hasSelection =
        selectionMode === "single" ? !!selection : !!selection?.length;

    return (
        <InputScaffold label={!hideLabel && label} {...props}>
            <InteractionSurface
                disabled={disabled}
                containerStyle={styles.container}
                onPress={onAdd}
            >
                <View style={styles.selectionContainer}>
                    {selectionMode === "single" && !!selection && (
                        <Text style={styles.selectionItemLabel}>
                            {selection.label}
                        </Text>
                    )}
                    {selectionMode === "multi" &&
                        !!selection?.length &&
                        selection.map((item) => (
                            <Tag
                                key={"id" in item ? item.id : item.value}
                                label={item.label}
                                onPress={
                                    onRemoveItem
                                        ? () => onRemoveItem(item)
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
                    <IconBase {...icons.showOptions} color={style.icon.color} />
                </View>
            </InteractionSurface>
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
                selectionInput.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
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
