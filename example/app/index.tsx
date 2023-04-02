import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, ListPage, NavigationHeader } from "@reillymc/react-native-components";
import { useRouter } from "expo-router";

/**
 * Map of all components to their respective screen
 */
export const ComponentScreens: Record<string, { name: string; page: string }> = {
    Action: { name: "Action", page: "ActionPage" },
    Button: { name: "Button", page: "ButtonPage" },
    IconAction: { name: "Icon Action", page: "IconActionPage" },
    IconButton: { name: "Icon Button", page: "IconButtonPage" },
    DropdownInput: { name: "Dropdown Input", page: "DropdownInputPage" },
    SelectionInput: { name: "Selection Input", page: "SelectionInputPage" },
    CounterInput: { name: "Counter Input", page: "CounterInputPage" },
    TextInput: { name: "Text Input", page: "TextInputPage" },
    NumberInput: { name: "Number Input", page: "NumberInputPage" },
    ToggleInput: { name: "Toggle Input", page: "ToggleInputPage" },
    ModalSheet: { name: "Modal Sheet", page: "ModalSheetPage" },
    ListPage: { name: "List Page", page: "ListPagePage" },
    ListItem: { name: "List Item", page: "ListItemPage" },
    Avatar: { name: "Avatar", page: "AvatarPage" },
    Tag: { name: "Tag", page: "TagPage" },
    CollapsibleContainer: { name: "Collapsible Container", page: "CollapsibleContainerPage" },
    ScrollPage: { name: "Scroll Page", page: "ScrollPagePage" },
};

const ComponentListScreen: React.FC = () => {
    const router = useRouter();

    return (
        <ListPage
            data={Object.values(ComponentScreens)}
            heading={<NavigationHeader heading="Components" />}
            renderItem={({ item }) => <ListItem heading={item.name} onPress={() => router.push(`/${item.page}`)} />}
            contentContainerStyle={styles.page}
        />
    );
};

const styles = StyleSheet.create({
    page: {
        paddingBottom: 48,
    },
});

export default ComponentListScreen;
