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
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";

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
    Pick<
        InputScaffoldProps,
        "helpText" | "hasError" | "mandatory" | "containerStyle" | "label"
    > &
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
            <ActionBase
                disabled={disabled}
                containerStyle={({ pressed }) => [
                    styles.container,
                    pressed && styles.containerPressed,
                ]}
                onPress={onAdd}
            >
                {(pressableState) => (
                    <>
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
                                        key={
                                            "id" in item ? item.id : item.value
                                        }
                                        label={item.label}
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
                                iconName={icons.showOptions}
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
) =>
    StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: inputBase.container.borderRadius,
            minHeight: inputBase.container.height[variant],
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
            flexDirection: "row",
            flexWrap: "wrap",
            gap: selectionInput.selectionContainer.gap,
            paddingLeft: inputBase.container.padding,
            marginVertical: inputBase.container.padding,
        },
        selectionItemLabel: {
            color: inputBase.text.color[disabled ? "disabled" : "enabled"],
        },
        placeholderText: {
            color: inputBase.text.placeholderColor,
        },
        iconContainer: {
            width: inputBase.container.height[variant],
            height: inputBase.container.height[variant],
            alignItems: "center",
            justifyContent: "center",
        },
    });
