import React from "react";

import { Button } from "@reillymc/react-native-components";
import { Text, View, StyleSheet } from "react-native";

export interface ComponentPageProps {
    componentName?: string;
    component: React.ReactNode;
    fullscreen?: boolean;
}

export const ComponentPage: React.FunctionComponent<ComponentPageProps> = ({ component, fullscreen }) => {
    return (
        <View style={[styles.container, fullscreen ? undefined : styles.centred]}>
            {component}
            <View>
                <Text>Props</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centred: {
        alignItems: "center",
        justifyContent: "center",
    },
});
