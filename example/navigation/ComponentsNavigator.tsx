import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import { ComponentListScreen, ButtonPage, IconButtonPage, ModalSheetPage } from "../screens";

type ComponentStackScreenProps<T extends keyof ComponentStackParamList> = {
    navigation: StackNavigationProp<ComponentStackParamList, T>;
    route: RouteProp<ComponentStackParamList, T>;
};

export interface ComponentsScreenProps extends ComponentStackScreenProps<"Components"> {}

const ComponentStack = createStackNavigator<ComponentStackParamList>();

/**
 * Route list for all components
 */
export type ComponentStackParamList = {
    Components: undefined;
    Button: undefined;
    IconButton: undefined;
    ModalSheet: undefined;
};

/**
 * Map of all components to their respective screen
 */
export const ComponentScreens: { [key in keyof Omit<ComponentStackParamList, "Components">]: React.ReactNode } = {
    Button: <ComponentStack.Screen name="Button" component={ButtonPage} />,
    IconButton: <ComponentStack.Screen name="IconButton" component={IconButtonPage} />,
    ModalSheet: <ComponentStack.Screen name="ModalSheet" component={ModalSheetPage} />,
};

export const ComponentStackNavigator = () => (
    <ComponentStack.Navigator
        initialRouteName="Components"
        screenOptions={{ headerShown: true, animationEnabled: true }}
    >
        <ComponentStack.Screen name="Components" component={ComponentListScreen} />
        {Object.values(ComponentScreens)}
    </ComponentStack.Navigator>
);
