import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, ListPage, NavigationHeader } from "@reillymc/react-native-components";

import { ComponentsScreenProps, ComponentScreens } from "../navigation/ComponentsNavigator";

export const ComponentListScreen: React.FunctionComponent<ComponentsScreenProps> = ({ navigation }) => {
    const navigateTo = (componentName: keyof typeof ComponentScreens) => navigation.navigate(componentName);

    return (
        <ListPage
            data={Object.entries(ComponentScreens).map(([key, { name }]) => ({ key, name }))}
            heading={<NavigationHeader heading="Components" />}
            renderItem={({ item }) => (
                <ListItem heading={item.name} onPress={() => navigateTo(item.key as keyof typeof ComponentScreens)} />
            )}
            contentContainerStyle={styles.page}
        />
    );
};

const styles = StyleSheet.create({
    page: {
        paddingBottom: 48,
    },
});
