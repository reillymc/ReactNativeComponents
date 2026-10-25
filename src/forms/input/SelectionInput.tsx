import { type ColorValue, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { InteractionSurface } from "../../actions/surface";
import { Tag } from "../../display/tag";
import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { IconBase, type IconBaseTheme } from "../../icons/IconBase";
import { defineStyles, type PropFilter, useComponent } from "../../internal";
import { Text } from "../../typography/text";
import type { InputBaseProps, InputState, InputVariant } from "./InputBase";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";
import type { ValueItem } from "./valueItem";

export type SelectionInputState = "enabled" | "disabled";

export type SelectionInputTheme = {
    container: {
        height: Record<InputVariant, number>;
        padding: number;
        borderRadius: number;
        backgroundColor: Record<SelectionInputState, ColorValue>;
    };
    selectionContainer: {
        gap: number;
    };
    text: {
        color: Record<InputState, ColorValue>;
        placeholderColor: ColorValue;
    };
    icon: Pick<IconBaseTheme, "color">;
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
        theme?: DeepPartial<SelectionInputTheme>;
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
    theme: themeOverrides,
    variant = "regular",
    onAdd,
    onRemoveItem,
    ...props
}: SelectionInputProps<T>) => {
    const disabled = disabledProp || !onAdd;
    const { styles, theme, icons } = useComponent("selectionInput", {
        themeOverrides,
        props: { disabled, variant },
        createStyles,
    });

    const hasSelection =
        selectionMode === "single" ? !!selection : !!selection?.length;

    return (
        <InputScaffold label={!hideLabel && label} {...props}>
            <InteractionSurface
                disabled={disabled}
                style={styles.container}
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
                    <IconBase {...icons.showOptions} color={theme.icon.color} />
                </View>
            </InteractionSurface>
        </InputScaffold>
    );
};

SelectionInput.displayName = "SelectionInput";

const createStyles = defineStyles(
    (
        theme: SelectionInputTheme,
        props: PropFilter<SelectionInputProps, "disabled" | "variant">,
    ) => ({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            minHeight: theme.container.height[props.variant],
            borderRadius: theme.container.borderRadius,
            backgroundColor:
                theme.container.backgroundColor[
                    props.disabled ? "disabled" : "enabled"
                ],
        },
        selectionContainer: {
            flex: 1,
            minWidth: 0,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.selectionContainer.gap,
            paddingStart: theme.container.padding,
            marginVertical: theme.container.padding,
        },
        selectionItemLabel: {
            color: theme.text.color[props.disabled ? "disabled" : "enabled"],
        },
        placeholderText: {
            color: theme.text.placeholderColor,
        },
        iconContainer: {
            width: theme.container.height[props.variant],
            height: theme.container.height[props.variant],
            alignItems: "center",
            justifyContent: "center",
        },
    }),
);
