import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@reillymc/react-native-components";

export interface ComponentPageProps {
    componentName?: string;
    component: React.ReactNode;
    propsPanel?: React.ReactNode;
    fullscreen?: boolean;
}

export const ComponentPage: React.FunctionComponent<ComponentPageProps> = ({ component, propsPanel, fullscreen }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.componentContainer, fullscreen ? undefined : styles.centred]}>{component}</View>
            {!fullscreen && (
                <View style={styles.propsContainer}>
                    <Text variant="title" style={styles.heading}>
                        Props
                    </Text>
                    {propsPanel}
                </View>
            )}
        </View>
    );
};

ComponentPage.displayName = "ComponentPage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e8e6e4",
    },
    componentContainer: {
        flex: 1,
    },
    centred: {
        alignItems: "center",
        justifyContent: "center",
    },
    propsContainer: {
        display: "flex",
        flex: 3,
    },
    heading: {
        marginLeft: 16,
    },
});
