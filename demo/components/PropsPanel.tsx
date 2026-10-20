/** biome-ignore-all lint/suspicious/noExplicitAny: any used for simple prop definition flexibility */
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Octicons from "@react-native-vector-icons/octicons";
import type { ValueItem } from "@reillymc/react-native-components/common";
import {
    CounterInput,
    SelectionInput,
    TextInput,
    ToggleInput,
} from "@reillymc/react-native-components/components";
import { useThemedStyles } from "@reillymc/react-native-components/hooks";

import { createThemedStyles } from "../theme";
import { useSelectionModal } from "./useSelectionModal";

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

type HiddenPropDefinition = {
    type: "hidden";
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
        | HiddenPropDefinition
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
    const styles = useThemedStyles(createStyles);

    const [customLabels, setCustomLabels] = useState<{
        [P in keyof T]?: string;
    }>({});

    const [selectionId, setSelectionId] = useState<string>();
    const [selectionItems, setSelectionItems] = useState<ValueItem[]>([]);
    const [initialSelection, setInitialSelection] = useState<ValueItem>();

    const { selectedItems, openSelectionModal } = useSelectionModal({
        key: selectionId ?? "",
        selectionMode: "single",
        label: selectionId ?? ":(",
        items: selectionItems,
        initialSelection: initialSelection ? [initialSelection] : [],
    });

    const selectedValue = selectedItems[0]?.value;

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
                                    value={currentValue?.toString()}
                                    onChange={(value) =>
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
                                    iconSet={Octicons}
                                    iconName="check"
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
                                    value={
                                        currentValue === undefined
                                            ? undefined
                                            : {
                                                  label: currentValue,
                                                  value: currentValue,
                                              }
                                    }
                                    onChange={(next) => {
                                        if (Array.isArray(next)) {
                                            onChange(
                                                propId,
                                                next.map((item) => item.value),
                                            );
                                            return;
                                        }
                                        onChange(propId, next?.value);
                                    }}
                                    onOpen={() => {
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
                                    value={selectedItem}
                                    onChange={(next) => {
                                        if (Array.isArray(next)) {
                                            onChange(
                                                propId,
                                                next.map((item) => item.value),
                                            );
                                            return;
                                        }
                                        onChange(propId, next?.value);
                                        setCustomLabels((prev) => ({
                                            ...prev,
                                            [propId]: next?.label,
                                        }));
                                    }}
                                    onOpen={() => {
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

const createStyles = createThemedStyles(({ styles: { propsPanel } }) => ({
    container: {
        display: "flex",
        backgroundColor: propsPanel.backgroundColor,
        borderTopStartRadius: propsPanel.borderRadius,
        borderTopEndRadius: propsPanel.borderRadius,
    },
    contentContainer: {
        width: propsPanel.contentWidth,
        alignSelf: "center",
        flexGrow: 1,
        paddingBottom: propsPanel.contentBottomPadding,
    },
    propContainer: {
        display: "flex",
        marginTop: propsPanel.itemSpacing,
    },
}));
