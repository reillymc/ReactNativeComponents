import React from "react";

import { Button } from "@reillymc/react-native-components";
import { View, StyleSheet } from "react-native";
import { ComponentScreens, ComponentsScreenProps, ComponentStackParamList } from "../navigation/ComponentsNavigator";

export const ComponentListScreen: React.FunctionComponent<ComponentsScreenProps> = ({ navigation }) => {
    const navigateTo = (componentName: keyof ComponentStackParamList) => () => {
        navigation.navigate(componentName);
    };

    return (
        <View style={styles.container}>
            {Object.keys(ComponentScreens).map(componentName => (
                <Button
                    label={componentName}
                    onPress={navigateTo(componentName as keyof ComponentStackParamList)}
                    variant="primary"
                    size="medium"
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
