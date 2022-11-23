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
    ActionPage,
    IconActionPage,
    TextInputPage,
    ToggleInputPage,
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

    Action: undefined;
    Button: undefined;
    IconAction: undefined;
    IconButton: undefined;

    DropdownInput: undefined;
    SelectionInput: undefined;
    TextInput: undefined;
    ToggleInput: undefined;

    ListItem: undefined;
    ListPage: undefined;
    ModalSheet: undefined;
    Avatar: undefined;
};

/**
 * Map of all components to their respective screen
 */
export const ComponentScreens: { [key in keyof Omit<ComponentStackParamList, "Components">]: React.ReactNode } = {
    Action: <ComponentStack.Screen key={"Action"} name="Action" component={ActionPage} />,
    Button: <ComponentStack.Screen key={"Button"} name="Button" component={ButtonPage} />,
    IconAction: <ComponentStack.Screen key={"IconAction"} name="IconAction" component={IconActionPage} />,
    IconButton: <ComponentStack.Screen key={"IconButton"} name="IconButton" component={IconButtonPage} />,
    DropdownInput: <ComponentStack.Screen key={"DropdownInput"} name="DropdownInput" component={DropdownInputPage} />,
    SelectionInput: (
        <ComponentStack.Screen key={"SelectionInput"} name="SelectionInput" component={SelectionInputPage} />
    ),
    TextInput: <ComponentStack.Screen key={"TextInput"} name="TextInput" component={TextInputPage} />,
    ToggleInput: <ComponentStack.Screen key={"ToggleInput"} name="ToggleInput" component={ToggleInputPage} />,
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
