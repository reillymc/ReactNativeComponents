import { View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { Tag } from "../../../display/tag";
import { defineStyles, useComponent } from "../../../internal";
import { Text } from "../../../typography/text";
import {
    FieldIcon,
    FieldRow,
    FieldSurface,
    useFieldControlState,
} from "../../field";
import type { ValueItem } from "../valueItem";
import type { SelectionInputTheme } from "./SelectionInput.theme";

type SelectionControlProps<T> = {
    placeholder?: string;
    selectionMode: "single" | "multi";
    selection?: ValueItem<T> | Array<ValueItem<T>>;
    themeOverrides?: DeepPartial<SelectionInputTheme>;
    onAdd?: () => void;
    onRemoveItem?: (item: ValueItem<T> | undefined) => void;
};

export const SelectionControl = <T,>({
    placeholder,
    selectionMode,
    selection,
    themeOverrides,
    onAdd,
    onRemoveItem,
}: SelectionControlProps<T>) => {
    const { interactive } = useFieldControlState();
    const { icons, styles, theme } = useComponent("selectionInput", {
        themeOverrides,
        createStyles,
    });
    const { theme: fieldTheme } = useComponent("field");
    const canAdd = interactive && !!onAdd;
    const canRemove = interactive && !!onRemoveItem;
    const hasSelection = Array.isArray(selection)
        ? selection.length > 0
        : !!selection;

    return (
        <FieldSurface
            onPress={canAdd ? onAdd : undefined}
            theme={theme.surface}
        >
            <FieldRow style={styles.boxNone}>
                <View
                    style={[
                        styles.selectionContainer,
                        {
                            paddingStart: fieldTheme.surface.padding,
                            paddingVertical: fieldTheme.surface.padding,
                        },
                    ]}
                >
                    {selectionMode === "single" &&
                        !!selection &&
                        !Array.isArray(selection) && (
                            <View style={styles.valueLabel}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    theme={{ color: fieldTheme.text.color }}
                                >
                                    {selection.label}
                                </Text>
                            </View>
                        )}
                    {selectionMode === "multi" &&
                        Array.isArray(selection) &&
                        selection.map((item) => (
                            <Tag
                                key={"id" in item ? item.id : item.value}
                                label={item.label}
                                onPress={
                                    canRemove && onRemoveItem
                                        ? () => onRemoveItem(item)
                                        : undefined
                                }
                            />
                        ))}

                    {!hasSelection && (
                        <View style={styles.valueLabel}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                theme={{
                                    color: fieldTheme.text.placeholderColor,
                                }}
                            >
                                {placeholder}
                            </Text>
                        </View>
                    )}
                </View>
                <FieldIcon {...icons.showOptions} />
            </FieldRow>
        </FieldSurface>
    );
};

const createStyles = defineStyles((theme: SelectionInputTheme) => ({
    selectionContainer: {
        flex: 1,
        minWidth: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "center",
        gap: theme.selectionContainer.gap,
        pointerEvents: "box-none",
    },
    boxNone: {
        pointerEvents: "box-none",
    },
    valueLabel: {
        pointerEvents: "none",
        flexShrink: 1,
        minWidth: 0,
        width: "100%",
        maxWidth: "100%",
    },
}));
