import React from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "@reillymc/react-native-components";

export interface ComponentPageProps {
    componentName?: string;
    component: React.ReactNode;
    propsPanel?: React.ReactNode;
    fullscreen?: boolean;
}

export const ComponentPage: React.FunctionComponent<ComponentPageProps> = ({ component, propsPanel, fullscreen }) => {
    return (
        <View style={[styles.container, fullscreen ? undefined : styles.centred]}>
            <View style={styles.componentContainer}>{component}</View>
            <View style={styles.propsContainer}>
                <Title style={styles.heading}>Props</Title>
                {propsPanel}
            </View>
        </View>
    );
};

ComponentPage.displayName = "ComponentPage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8e6e4",
    },
    componentContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    propsContainer: {
        display: "flex",
        flex: 3,
    },

    heading: {
        marginLeft: 16,
    },
    centred: {
        justifyContent: "center",
    },
});
