import React from "react";

import { Button } from "@reillymc/react-native-components";
import { Text, View, StyleSheet } from "react-native";

export interface ComponentPageProps {
    componentName?: string;
    component: React.ReactNode;
}

export const ComponentPage: React.FunctionComponent<ComponentPageProps> = ({ component, componentName }) => {
    return (
        <View style={styles.container}>
            {component}
            <View>
                <Text>Props</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
