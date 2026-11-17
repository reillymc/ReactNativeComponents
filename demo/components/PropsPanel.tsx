/** biome-ignore-all lint/suspicious/noExplicitAny: any used for simple prop definition flexibility */
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Octicons from "@react-native-vector-icons/octicons";
import {
    CounterInput,
    SelectionInput,
    TextInput,
    ToggleInput,
    type ValueItem,
} from "@reillymc/react-native-components/forms";

import { defineStyles, useStyles } from "../theme";
import { useSelectionModal } from "./useSelectionModal";
import { getValueItemKey, type ValueItemKey } from "./valueItem";

type PropDefinitionBase = {
    label?: string;
};

type StringPropDefinition<T> = PropDefinitionBase & {
    type: "string";
    default: T;
};

type NumberPropDefinition<T> = PropDefinitionBase & {
    type: "number";
    default: T;
};

type BooleanPropDefinition<T> = PropDefinitionBase & {
    type: "boolean";
    default: T;
};

type FunctionPropDefinition<T> = PropDefinitionBase & {
    type: "function";
    default: T;
};

type HiddenPropDefinition<T> = PropDefinitionBase & {
    type: "hidden";
    default: T;
};

type ArrayPropDefinition<T> = PropDefinitionBase & {
    type: "array";
    values: string[];
    default: T;
};

type EnumPropDefinition<T> = PropDefinitionBase & {
    type: "enum";
    values: ReadonlyArray<ValueItem<T>>;
    default: ValueItemKey<T>;
};

type PropDefinition<T> =
    | StringPropDefinition<T>
    | NumberPropDefinition<T>
    | BooleanPropDefinition<T>
    | FunctionPropDefinition<T>
    | ArrayPropDefinition<T>
    | HiddenPropDefinition<T>
    | EnumPropDefinition<T>;

export type PropDefinitions<T> = {
    [P in keyof T]: PropDefinition<T[P]>;
};

export interface PropsPanelProps<T> {
    propValues: T;
    propDefinitions: PropDefinitions<T>;
    onChange: (propName: keyof T, value: any) => void;
}

export const PropsPanel = <T extends Record<string, any>>({
    propDefinitions,
    propValues,
    onChange,
}: PropsPanelProps<T>) => {
    const styles = useStyles(createStyles);

    const [customLabels, setCustomLabels] = useState<{
        [P in keyof T]?: string;
    }>({});

    const { openSelectionModal } = useSelectionModal();

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
                                    value={currentValue ?? ""}
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
                                    value={
                                        Number.isFinite(currentValue)
                                            ? currentValue.toString()
                                            : ""
                                    }
                                    onChange={(value) => {
                                        const parsed = Number.parseInt(
                                            value,
                                            10,
                                        );
                                        onChange(
                                            propId,
                                            Number.isFinite(parsed)
                                                ? parsed
                                                : undefined,
                                        );
                                    }}
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
                                    selectionMode="single"
                                    onRemoveItem={(value) =>
                                        onChange(
                                            propId,
                                            Array.isArray(currentValue)
                                                ? currentValue.filter(
                                                      (x) => x !== value,
                                                  )
                                                : undefined,
                                        )
                                    }
                                    selection={{
                                        label: currentValue,
                                        value: currentValue,
                                    }}
                                    onAdd={() =>
                                        openSelectionModal({
                                            key: propId,
                                            items: definition.values.map(
                                                (value) => ({
                                                    value,
                                                    label: value,
                                                }),
                                            ),
                                            selectionMode: "single",
                                            label: definition.label ?? propId,
                                            selection:
                                                currentValue == null
                                                    ? []
                                                    : [
                                                          {
                                                              label: currentValue,
                                                              value: currentValue,
                                                          },
                                                      ],
                                            onSelect: (items) =>
                                                onChange(
                                                    propId,
                                                    items[0]?.value,
                                                ),
                                        })
                                    }
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
                                    (item) =>
                                        getValueItemKey(item) ===
                                        definition.default,
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
                                    selectionMode="single"
                                    onRemoveItem={(value) => {
                                        onChange(
                                            propId,
                                            Array.isArray(currentValue)
                                                ? currentValue.filter(
                                                      (x) => x !== value,
                                                  )
                                                : undefined,
                                        );
                                        setCustomLabels((prev) => ({
                                            ...prev,
                                            [propId]: value?.label,
                                        }));
                                    }}
                                    selection={selectedItem}
                                    onAdd={() =>
                                        openSelectionModal({
                                            key: propId,
                                            items: [...definition.values],
                                            selectionMode: "single",
                                            label: definition.label ?? propId,
                                            selection:
                                                currentValue == null
                                                    ? []
                                                    : [selectedItem],
                                            onSelect: (items) =>
                                                onChange(
                                                    propId,
                                                    items[0]?.value,
                                                ),
                                        })
                                    }
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

const createStyles = defineStyles(({ palette }) => ({
    container: {
        display: "flex",
        backgroundColor: palette.color.surface,
        borderTopStartRadius: palette.border.radius.loose,
        borderTopEndRadius: palette.border.radius.loose,
    },
    contentContainer: {
        width: "60%",
        alignSelf: "center",
        flexGrow: 1,
        paddingBottom: 120,
    },
    propContainer: {
        display: "flex",
        marginTop: palette.spacing.large,
    },
}));
