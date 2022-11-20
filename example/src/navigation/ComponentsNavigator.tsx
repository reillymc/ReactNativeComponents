import React from "react";
import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import {
    ComponentListScreen,
    ButtonPage,
    IconButtonPage,
    ModalSheetPage,
    DropdownInputPage,
    SelectionInputPage,
    ListPagePage,
    ListItemPage,
    AvatarPage,
} from "../screens";

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
    DropdownInput: undefined;
    SelectionInput: undefined;
    IconButton: undefined;
    ModalSheet: undefined;
    ListPage: undefined;
    ListItem: undefined;
    Avatar: undefined;
};

/**
 * Map of all components to their respective screen
 */
export const ComponentScreens: { [key in keyof Omit<ComponentStackParamList, "Components">]: React.ReactNode } = {
    Button: <ComponentStack.Screen key={"Button"} name="Button" component={ButtonPage} />,
    DropdownInput: <ComponentStack.Screen key={"DropdownInput"} name="DropdownInput" component={DropdownInputPage} />,
    IconButton: <ComponentStack.Screen key={"IconButton"} name="IconButton" component={IconButtonPage} />,
    SelectionInput: (
        <ComponentStack.Screen key={"SelectionInput"} name="SelectionInput" component={SelectionInputPage} />
    ),
    ModalSheet: <ComponentStack.Screen key={"ModalSheet"} name="ModalSheet" component={ModalSheetPage} />,
    ListPage: <ComponentStack.Screen key={"ListPage"} name="ListPage" component={ListPagePage} />,
    ListItem: <ComponentStack.Screen key={"ListItem"} name="ListItem" component={ListItemPage} />,
    Avatar: <ComponentStack.Screen key={"Avatar"} name="Avatar" component={AvatarPage} />,
}; //satisfies Record<keyof ComponentStackParamList, React.ReactNode>;

export const ComponentStackNavigator = () => (
    <ComponentStack.Navigator
        initialRouteName="Components"
        screenOptions={{ headerShown: true, animationEnabled: true }}
    >
        <ComponentStack.Screen name="Components" component={ComponentListScreen} />
        {Object.values(ComponentScreens)}
    </ComponentStack.Navigator>
);
