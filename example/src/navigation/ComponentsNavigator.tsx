import React from "react";
import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import {
    ActionPage,
    AvatarPage,
    ButtonPage,
    CollapsibleContainerPage,
    ComponentListScreen,
    DropdownInputPage,
    IconActionPage,
    IconButtonPage,
    ListItemPage,
    ListPagePage,
    ModalSheetPage,
    NumberInputPage,
    SelectionInputPage,
    TagPage,
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
export type ComponentStackParamList = Record<keyof typeof ComponentScreens, undefined> & {
    Components: undefined;
};

/**
 * Map of all components to their respective screen
 */
export const ComponentScreens = {
    Action: { name: "Action", component: ActionPage },
    Button: { name: "Button", component: ButtonPage },
    IconAction: { name: "Icon Action", component: IconActionPage },
    IconButton: { name: "Icon Button", component: IconButtonPage },
    DropdownInput: { name: "Dropdown Input", component: DropdownInputPage },
    SelectionInput: { name: "Selection Input", component: SelectionInputPage },
    TextInput: { name: "Text Input", component: TextInputPage },
    NumberInput: { name: "Number Input", component: NumberInputPage },
    ToggleInput: { name: "Toggle Input", component: ToggleInputPage },
    ModalSheet: { name: "Modal Sheet", component: ModalSheetPage },
    ListPage: { name: "List Page", component: ListPagePage },
    ListItem: { name: "List Item", component: ListItemPage },
    Avatar: { name: "Avatar", component: AvatarPage },
    Tag: { name: "Tag", component: TagPage },
    CollapsibleContainer: { name: "Collapsible Container", component: CollapsibleContainerPage },
} satisfies Record<string, {name: string, component: React.FunctionComponent}>;

export const ComponentStackNavigator = () => (
    <ComponentStack.Navigator
        initialRouteName="Components"
        screenOptions={{ headerShown: false, animationEnabled: true }}
    >
        <ComponentStack.Screen name="Components" component={ComponentListScreen} options={{ headerShown: false }} />
        {Object.entries(ComponentScreens).map(([key, { name, component }]) => (
            <ComponentStack.Screen key={name} name={key as keyof typeof ComponentScreens} component={component} />
        ))}
    </ComponentStack.Navigator>
);
