import { useState } from "react";
import { View } from "react-native";
import { Menu, MenuItem } from "@reillymc/react-native-components/overlays";
import { Text } from "@reillymc/react-native-components/typography";

import { ComponentPage } from "../demo/components";

type MenuEntry = {
    id: string;
    label: string;
    description?: string;
};

const items: Array<MenuEntry> = [
    { id: "one", label: "Item one", description: "First menu item" },
    { id: "two", label: "Item two" },
    { id: "three", label: "Item three", description: "Third menu item" },
];

const MenuPage = () => {
    const [selected, setSelected] = useState("one");

    return (
        <ComponentPage
            componentName="Menu"
            component={
                <View style={{ width: "100%", gap: 8 }}>
                    <Text variant="caption">Selected: {selected}</Text>
                    <View style={{ height: 200 }}>
                        <Menu
                            data={items}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <MenuItem
                                    label={item.label}
                                    description={item.description}
                                    searchValue="Item"
                                    highlighted={item.id === selected}
                                    onPress={() => setSelected(item.id)}
                                />
                            )}
                        />
                    </View>
                </View>
            }
        />
    );
};

export default MenuPage;
