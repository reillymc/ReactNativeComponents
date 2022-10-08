import React from "react";

import { Button } from "@reillymc/react-native-components";
import { Text } from "react-native";
import { ComponentsScreenProps } from "../navigation/ComponentsNavigator";

export const ComponentListScreen: React.FunctionComponent<ComponentsScreenProps> = ({ navigation }) => {
    
    return (
        <>
            <Text>hi</Text>
            {/* <Button label="Primary Button" onPress={() => null} variant="primary" size="medium" />
            <Button label="Secondary Button" onPress={() => null} variant="secondary" size="large" />
            <Button label="Flat Button" onPress={() => null} variant="flat" size="large" /> */}
        </>
    );
};
