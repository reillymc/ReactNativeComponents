import React from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SelectionInput, Text, TextInput, ToggleInput } from "@reillymc/react-native-components";
import { SelectionItem } from "../../../src/components/inputs/SelectionInput";

type PropDefinitionBase = {
    label?: string;
};

type StringPropDefinition = {
    type: "string";
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
    values: Array<SelectionItem<T>>;
    default?: this["values"][number]["label"];
}

type PropDefinition<T> = PropDefinitionBase &
    (
        | StringPropDefinition
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
    onChange: (propName: keyof T, value: any) => void;
}

export const PropsPanel = <T extends Record<string, any>>({
    propDefinitions,
    propValues,
    onChange,
}: PropsPanelProps<T>) => {
    const [customLabels, setCustomLabels] = React.useState<{ [P in keyof T]?: string }>({});

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyContainer}
            keyboardVerticalOffset={294}
        >
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
                                <View key={definition.label} style={styles.propContainer}>
                                    <Text variant="heading" style={styles.propHeading}>
                                        {definition.label ?? propId}
                                    </Text>
                                    <TextInput
                                        value={currentValue}
                                        onChangeText={value => onChange(propId, value)}
                                        width="full"
                                        autoCapitalize="none"
                                    />
                                </View>
                            );
                        case "boolean":
                            return (
                                <View key={definition.label} style={styles.propContainer}>
                                    <Text variant="heading" style={styles.propHeading}>
                                        {definition.label ?? propId}
                                    </Text>
                                    <ToggleInput value={currentValue} onChange={value => onChange(propId, value)} />
                                </View>
                            );
                        case "array":
                            return (
                                <View key={definition.label} style={styles.propContainer}>
                                    <Text variant="heading" style={styles.propHeading}>
                                        {definition.label ?? propId}
                                    </Text>
                                    <SelectionInput
                                        items={definition.values.map(value => ({ value, label: value }))}
                                        onSelect={value => onChange(propId, value?.value)}
                                        selectedItem={{ label: currentValue, value: currentValue }}
                                    />
                                </View>
                            );
                        case "enum":
                            const selectedItem = {
                                label:
                                    customLabels[propId] ??
                                    definition.values.find(({ label }) => label === definition.default)?.label ??
                                    definition.values[0]?.label ??
                                    "",
                                value: currentValue,
                            };
                            return (
                                <View key={definition.label} style={styles.propContainer}>
                                    <Text variant="heading" style={styles.propHeading}>
                                        {definition.label ?? propId}
                                    </Text>
                                    <SelectionInput
                                        items={definition.values}
                                        onSelect={value => {
                                            onChange(propId, value?.value);
                                            setCustomLabels(prev => ({ ...prev, [propId]: value.label }));
                                        }}
                                        selectedItem={selectedItem}
                                    />
                                </View>
                            );
                        default:
                            return null;
                    }
                })}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

PropsPanel.displayName = "PropsPanel";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "white",
        marginTop: 16,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    keyContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    contentContainer: {
        width: "60%",
        alignSelf: "center",
        flexGrow: 1,
    },
    propContainer: {
        display: "flex",
        marginTop: 24,
    },
    propHeading: {
        marginBottom: 5,
    },
});
