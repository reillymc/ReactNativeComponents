import React, { type ReactElement, useState } from "react";
import {
    SectionList,
    type SectionListData,
    StyleSheet,
    View,
} from "react-native";
import { type Href, Stack, useRouter } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import {
    Action,
    Avatar,
    Button,
    CollapsibleContainer,
    CounterInput,
    DropdownInput,
    Icon,
    IconAction,
    IconButton,
    ListItem,
    ListItemAlert,
    NumberInput,
    SelectionInput,
    Tag,
    Text,
    TextInput,
    type ThemedStyles,
    TimeInput,
    ToggleInput,
    useTheme,
    useThemedStyles,
} from "@reillymc/react-native-components";

interface ComponentScreen {
    name: string;
    href: Href;
    component?: ReactElement;
}
type ComponentScreenSection = SectionListData<
    ComponentScreen,
    { sectionName: string }
>;
/**
 * Map of all components to their respective screen
 */
export const ComponentScreens: Array<ComponentScreenSection> = [
    {
        sectionName: "Text",
        data: [
            {
                name: "Text",
                href: "/TextPage",
                component: <Text variant="body">Text</Text>,
            },
        ],
    },
    {
        sectionName: "Icon",
        data: [
            {
                name: "Icon",
                href: "/IconPage",
                component: <Icon iconSet={Octicons} iconName="star" />,
            },
        ],
    },
    {
        sectionName: "Actions",
        data: [
            {
                name: "Action",
                href: "/ActionPage",
                component: <Action label="Action" />,
            },
            {
                name: "Icon Action",
                href: "/IconActionPage",
                component: (
                    <IconAction
                        iconSet={Octicons}
                        iconName="star"
                        label="Icon Action"
                    />
                ),
            },
        ],
    },
    {
        sectionName: "Buttons",
        data: [
            {
                name: "Button",
                href: "/ButtonPage",
                component: <Button label="Button" />,
            },
            {
                name: "Icon Button",
                href: "/IconButtonPage",
                component: <IconButton iconSet={Octicons} iconName="star" />,
            },
        ],
    },
    {
        sectionName: "Inputs",
        data: [
            {
                name: "Text Input",
                href: "/TextInputPage",
                component: <TextInput placeholder="Text Input" />,
            },
            {
                name: "Counter Input",
                href: "/CounterInputPage",
                component: <CounterInput placeholder="Counter Input" />,
            },
            {
                name: "Number Input",
                href: "/NumberInputPage",
                component: <NumberInput placeholder="Number Input" />,
            },
            {
                name: "Time Input",
                href: "/TimeInputPage",
                component: <TimeInput />,
            },
            {
                name: "Selection Input",
                href: "/SelectionInputPage",
                component: (
                    <SelectionInput
                        label="Selection Input"
                        selectionMode="single"
                        placeholder="Selection Input"
                    />
                ),
            },
            {
                name: "Dropdown Input",
                href: "/DropdownInputPage",
                component: (
                    <DropdownInput
                        onSelect={() => null}
                        placeholder="Dropdown Input"
                    />
                ),
            },
            {
                name: "Toggle Input",
                href: "/ToggleInputPage",
                component: (
                    <ToggleInput onChange={() => null} label="Toggle Input" />
                ),
            },
        ],
    },
    {
        sectionName: "Other",
        data: [
            { name: "List Item", href: "/ListItemPage" },
            {
                name: "Avatar",
                href: "/AvatarPage",
                component: <Avatar firstName="First" lastName="Last" />,
            },
            { name: "Tag", href: "/TagPage", component: <Tag label="Tag" /> },
            { name: "Panel", href: "/PanelPage" },
            {
                name: "Collapsible Container",
                href: "/CollapsibleContainerPage",
            },
        ],
    },
];

const ComponentListScreen: React.FC = () => {
    const router = useRouter();
    const { theme } = useTheme();

    const styles = useThemedStyles(createStyles, undefined);

    const [collapsed, setCollapsed] = useState(true);
    const [variant, setVariant] = useState<"primary" | "secondary">();

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
            <SectionList
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps="handled"
                sections={ComponentScreens}
                keyExtractor={({ name }) => name}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <IconAction
                            label="Common Props"
                            iconSet={Octicons}
                            iconName={collapsed ? "chevron-down" : "chevron-up"}
                            iconPosition="right"
                            onPress={() => setCollapsed((prev) => !prev)}
                        />
                        <CollapsibleContainer
                            collapsed={collapsed}
                            direction="up"
                            style={styles.propsContainer}
                        >
                            <DropdownInput
                                placeholder="Variant"
                                onSelect={(e) => setVariant(e?.value)}
                                items={[
                                    { label: "Primary", value: "primary" },
                                    { label: "Secondary", value: "secondary" },
                                ]}
                            />
                        </CollapsibleContainer>
                    </View>
                }
                renderSectionHeader={({ section }) => (
                    <Text variant="label" style={styles.sectionHeading}>
                        {section.sectionName}
                    </Text>
                )}
                renderItem={({ item: { name, href, component } }) => {
                    return (
                        <ListItem
                            heading={name}
                            onPress={() => router.push(href)}
                            alert={
                                component && (
                                    <View style={{ flexDirection: "row" }}>
                                        <ListItemAlert>
                                            {React.cloneElement(component, {
                                                ...(component.props as any),
                                                variant,
                                            })}
                                        </ListItemAlert>
                                    </View>
                                )
                            }
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
        listHeader: {
            alignItems: "flex-end",
        },
        propsContainer: {
            height: 120,
            marginTop: 20,
            width: "100%",
        },
        sectionHeading: {
            marginTop: spacing.small,
            marginBottom: spacing.small,
            marginLeft: spacing.medium,
        },
    });

export default ComponentListScreen;
