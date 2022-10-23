import React from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { ButtonProps, DropdownInput, Heading, TextInput } from "@reillymc/react-native-components";

type PropDefinitionBase = {
    label?: string;
};

type StringPropDefinition = {
    type: "string";
};

type FunctionPropDefinition = {
    type: "function";
};

type ArrayPropDefinition = {
    type: "array";
    values: string[];
};

type PropDefinition = PropDefinitionBase & (StringPropDefinition | FunctionPropDefinition | ArrayPropDefinition);

export type PropDefinitions<T> = {
    [P in keyof T]: PropDefinition;
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
                {Object.entries(propDefinitions).map(([key, definition]) => {
                    const propId = key as keyof ButtonProps;

                    switch (definition.type) {
                        case "string":
                            return (
                                <View key={definition.label} style={styles.propContainer}>
                                    <Heading heading={definition.label ?? propId} style={styles.propHeading} />
                                    <TextInput
                                        value={propValues[propId as keyof ButtonProps] as any}
                                        onChangeText={value => onChange(propId, value)}
                                        width="full"
                                        autoCapitalize="none"
                                    />
                                </View>
                            );
                        case "array":
                            return (
                                <View key={definition.label} style={styles.propContainer}>
                                    <Heading heading={definition.label ?? propId} style={styles.propHeading} />
                                    <DropdownInput
                                        items={definition.values.map(value => ({ id: value, label: value }))}
                                        onSelect={value => onChange(propId, value?.id)}
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
