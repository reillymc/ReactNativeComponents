import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import { ComponentListScreen, ButtonExample } from "../screens";

export type ComponentStackParamList = {
    Components: undefined;
    Button: undefined;
};

type ComponentStackScreenProps<T extends keyof ComponentStackParamList> = {
    navigation: StackNavigationProp<ComponentStackParamList, T>;
    route: RouteProp<ComponentStackParamList, T>;
};

export interface ComponentsScreenProps extends ComponentStackScreenProps<"Components"> {}

const ComponentStack = createStackNavigator<ComponentStackParamList>();

export const ComponentStackNavigator = () => (
    <ComponentStack.Navigator initialRouteName="Components" screenOptions={{ headerShown: true, animationEnabled: true }}>
        <ComponentStack.Screen name="Components" component={ComponentListScreen} />
        <ComponentStack.Screen name="Button" component={ButtonExample} />
    </ComponentStack.Navigator>
);
