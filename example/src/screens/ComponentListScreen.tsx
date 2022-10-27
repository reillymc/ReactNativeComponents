import React from "react";
import { View, StyleSheet } from "react-native";

import { Button } from "@reillymc/react-native-components";

import { ComponentsScreenProps, ComponentScreens } from "../navigation/ComponentsNavigator";

export const ComponentListScreen: React.FunctionComponent<ComponentsScreenProps> = ({ navigation }) => {
    const navigateTo = (componentName: keyof typeof ComponentScreens) => () => {
        navigation.navigate(componentName);
    };

    return (
        <View style={styles.container}>
            {Object.keys(ComponentScreens).map(componentName => (
                <Button
                    key={componentName}
                    label={componentName}
                    onPress={navigateTo(componentName as keyof typeof ComponentScreens)}
                    variant="primary"
                    size="regular"
                    style={styles.navigator}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    navigator: {
        marginVertical: 10,
    },
});
