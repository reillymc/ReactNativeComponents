import React, { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    CounterInput,
    SelectionInput,
    TextInput,
    type Theme,
    ToggleInput,
    useTheme,
    type ValueItem,
} from "@reillymc/react-native-components";

import { useSelectionModal } from "../app/SelectionModal";

type PropDefinitionBase = {
    label?: string;
};

type StringPropDefinition = {
    type: "string";
};

type NumberPropDefinition = {
    type: "number";
};

type BooleanPropDefinition = {
    type: "boolean";
};

type FunctionPropDefinition = {
    type: "function";
};

type ArrayPropDefinition = {
    type: "array";
    values: string[];
};

interface EnumPropDefinition<T> {
    type: "enum";
    values: Array<ValueItem<T>>;
    default?: this["values"][number]["label"];
}

type PropDefinition<T> = PropDefinitionBase &
    (
        | StringPropDefinition
        | NumberPropDefinition
        | BooleanPropDefinition
        | FunctionPropDefinition
        | ArrayPropDefinition
        | EnumPropDefinition<T>
    );

export type PropDefinitions<T> = {
    [P in keyof T]: PropDefinition<T[P]>;
};

export interface PropsPanelProps<T> {
    propValues: T;
    propDefinitions: PropDefinitions<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (propName: keyof T, value: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PropsPanel = <T extends Record<string, any>>({
    propDefinitions,
    propValues,
    onChange,
}: PropsPanelProps<T>) => {
    const { theme } = useTheme();

    const [customLabels, setCustomLabels] = React.useState<{
        [P in keyof T]?: string;
    }>({});

    const styles = createStyles(theme);

    const [selectionId, setSelectionId] = React.useState<string>();
    const [selectionItems, setSelectionItems] = React.useState<ValueItem[]>([]);
    const [initialSelection, setInitialSelection] = React.useState<ValueItem>();

    const { selectedItems, openSelectionModal } = useSelectionModal({
        key: selectionId ?? "",
        selectionMode: "single",
        label: selectionId ?? ":(",
        items: selectionItems,
        initialSelection: initialSelection ? [initialSelection] : [],
    });

    const selectedValue = useMemo(
        () => selectedItems[0]?.value,
        [selectedItems],
    );

    useEffect(() => {
        if (!(selectionId && selectedValue)) return;
        onChange(selectionId, selectedValue);
        setSelectionId(undefined);
    }, [onChange, selectionId, selectedValue]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            keyboardDismissMode="on-drag"
        >
            {Object.entries(propDefinitions).map(([key, def]) => {
                const definition = def as PropDefinition<T[keyof T]>;
                const propId = key;
                const currentValue = propValues[propId];

                switch (definition.type) {
                    case "string":
                        return (
                            <View
                                key={definition.label}
                                style={styles.propContainer}
                            >
                                <TextInput
                                    label={definition.label ?? propId}
                                    value={currentValue}
                                    onChangeText={(value) =>
                                        onChange(propId, value)
                                    }
                                />
                            </View>
                        );
                    case "number":
                        return (
                            <View
                                key={definition.label}
                                style={styles.propContainer}
                            >
                                <CounterInput
                                    label={definition.label ?? propId}
                                    value={currentValue.toString()}
                                    onChangeText={(value) =>
                                        onChange(
                                            propId,
                                            Number.parseInt(value, 10),
                                        )
                                    }
                                    autoCapitalize="none"
                                />
                            </View>
                        );
                    case "boolean":
                        return (
                            <View
                                key={definition.label}
                                style={styles.propContainer}
                            >
                                <ToggleInput
                                    value={currentValue}
                                    label={definition.label ?? propId}
                                    onChange={(value) =>
                                        onChange(propId, value)
                                    }
                                    iconVariant="check"
                                />
                            </View>
                        );
                    case "array":
                        return (
                            <View
                                key={definition.label}
                                style={styles.propContainer}
                            >
                                <SelectionInput
                                    label={definition.label}
                                    items={definition.values.map((value) => ({
                                        value,
                                        label: value,
                                    }))}
                                    selectionMode="single"
                                    onRemoveItem={(value) =>
                                        onChange(
                                            propId,
                                            (Array.isArray(currentValue)
                                                ? currentValue.filter(
                                                      (x) => x !== value,
                                                  )
                                                : undefined) as any,
                                        )
                                    }
                                    selection={{
                                        label: currentValue,
                                        value: currentValue,
                                    }}
                                    onAdd={() => {
                                        setSelectionId(propId);
                                        setSelectionItems(
                                            definition.values.map((value) => ({
                                                value,
                                                label: value,
                                            })),
                                        );
                                        openSelectionModal();

                                        setInitialSelection({
                                            label: currentValue,
                                            value: currentValue,
                                        });
                                    }}
                                />
                            </View>
                        );
                    case "enum": {
                        const selectedItem = {
                            label:
                                customLabels[propId] ??
                                definition.values.find(
                                    ({ value }) => value === currentValue,
                                )?.label ??
                                definition.values.find(
                                    ({ label }) => label === definition.default,
                                )?.label ??
                                definition.values[0]?.label ??
                                "",
                            value: currentValue,
                        };

                        return (
                            <View
                                key={definition.label}
                                style={styles.propContainer}
                            >
                                <SelectionInput
                                    label={definition.label}
                                    items={definition.values}
                                    selectionMode="single"
                                    onRemoveItem={(value) => {
                                        onChange(
                                            propId,
                                            (Array.isArray(currentValue)
                                                ? currentValue.filter(
                                                      (x) => x !== value,
                                                  )
                                                : undefined) as any,
                                        );
                                        setCustomLabels((prev) => ({
                                            ...prev,
                                            [propId]: value?.label,
                                        }));
                                    }}
                                    selection={selectedItem}
                                    onAdd={() => {
                                        openSelectionModal();
                                        setSelectionId(propId);
                                        setSelectionItems(definition.values);

                                        setInitialSelection({
                                            label: currentValue,
                                            value: currentValue,
                                        });
                                    }}
                                />
                            </View>
                        );
                    }
                    default:
                        return null;
                }
            })}
        </ScrollView>
    );
};

PropsPanel.displayName = "PropsPanel";

const createStyles = (theme: Theme) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            backgroundColor: theme.color.foreground,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
        },
        contentContainer: {
            width: "60%",
            alignSelf: "center",
            flexGrow: 1,
            paddingBottom: 120,
        },
        propContainer: {
            display: "flex",
            marginTop: 24,
        },
    });
    return styles;
};
