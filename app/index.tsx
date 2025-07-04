import type React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
    ListItem,
    type ThemedStyles,
    useTheme,
    useThemedStyles,
} from "@reillymc/react-native-components";

/**
 * Map of all components to their respective screen
 */
export const ComponentScreens = {
    Action: { name: "Action", page: "ActionPage" },
    Button: { name: "Button", page: "ButtonPage" },
    IconAction: { name: "Icon Action", page: "IconActionPage" },
    IconButton: { name: "Icon Button", page: "IconButtonPage" },
    DropdownInput: { name: "Dropdown Input", page: "DropdownInputPage" },
    SelectionInput: { name: "Selection Input", page: "SelectionInputPage" },
    CounterInput: { name: "Counter Input", page: "CounterInputPage" },
    TextInput: { name: "Text Input", page: "TextInputPage" },
    NumberInput: { name: "Number Input", page: "NumberInputPage" },
    MultiNumberInput: {
        name: "Multi-Number Input",
        page: "MultiNumberInputPage",
    },
    TimeInput: { name: "Time Input", page: "TimeInputPage" },
    ToggleInput: { name: "Toggle Input", page: "ToggleInputPage" },
    ListItem: { name: "List Item", page: "ListItemPage" },
    Avatar: { name: "Avatar", page: "AvatarPage" },
    Tag: { name: "Tag", page: "TagPage" },
    Panel: { name: "Panel", page: "PanelPage" },
    CollapsibleContainer: {
        name: "Collapsible Container",
        page: "CollapsibleContainerPage",
    },
    InlineSelectionInput: {
        name: "Inline Selection Input",
        page: "InlineSelectionInputPage",
    },
} as const satisfies Record<string, { name: string; page: string }>;

const ComponentListScreen: React.FC = () => {
    const router = useRouter();
    const { theme } = useTheme();

    const styles = useThemedStyles(createStyles, undefined);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Components",
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerLargeTitleStyle: {
                        fontFamily: theme.font.familyWeight.bold800,
                    },
                    headerBackTitleStyle: {
                        fontFamily: theme.font.familyWeight.regular400,
                    },
                    headerLargeStyle: {
                        backgroundColor: theme.color.background,
                    },
                }}
            />
            <FlatList
                contentInsetAdjustmentBehavior="automatic"
                data={Object.values(ComponentScreens)}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            heading={item.name}
                            onPress={() => router.push(`/${item.page}`)}
                        />
                    );
                }}
                contentContainerStyle={styles.page}
            />
        </>
    );
};

const createStyles = ({ theme: { spacing, color } }: ThemedStyles) =>
    StyleSheet.create({
        page: {
            backgroundColor: color.background,
            paddingHorizontal: spacing.pageHorizontal,
            paddingTop: spacing.pageTop,
            paddingBottom: 64,
        },
    });

export default ComponentListScreen;
