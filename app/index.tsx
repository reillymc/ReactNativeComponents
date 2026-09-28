import React, { type ReactElement, useState } from "react";
import {
    SectionList,
    type SectionListData,
    StyleSheet,
    View,
} from "react-native";
import { type Href, Stack, useRouter } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import {
    Action,
    Avatar,
    Button,
    CounterInput,
    DropdownInput,
    HighlightedText,
    Icon,
    IconAction,
    IconButton,
    ListItem,
    ListItemAlert,
    NumberInput,
    Panel,
    Rating,
    RatingInput,
    SelectionInput,
    Tag,
    Text,
    TextInput,
    TimeInput,
    ToggleInput,
} from "@reillymc/react-native-components/components";
import {
    type ThemedStyles,
    useTheme,
    useThemedStyles,
} from "@reillymc/react-native-components/hooks";

interface ComponentScreen {
    name: string;
    href: Href;
    component?: ReactElement<Record<string, unknown>>;
}
type ComponentScreenSection = SectionListData<
    ComponentScreen,
    { sectionName: string }
>;
/**
 * Map of all components to their respective screen
 */
const ComponentScreens: Array<ComponentScreenSection> = [
    {
        sectionName: "Text",
        data: [
            {
                name: "Text",
                href: "/TextPage",
                component: <Text variant="body">Text</Text>,
            },
            {
                name: "Highlighted Text",
                href: "/HighlightedTextPage",
                component: (
                    <HighlightedText
                        variant="body"
                        text="Highlighted Text"
                        highlight="Highlight"
                    />
                ),
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
                component: <CounterInput placeholder="0" />,
            },
            {
                name: "Number Input",
                href: "/NumberInputPage",
                component: <NumberInput placeholder="0" />,
            },
            {
                name: "Time Input",
                href: "/TimeInputPage",
                component: (
                    <TimeInput hoursPlaceholder="0" minutesPlaceholder="0" />
                ),
            },
            {
                name: "Selection Input",
                href: "/SelectionInputPage",
                component: (
                    <SelectionInput
                        label="Selection Input"
                        selectionMode="single"
                        placeholder="Selection Input"
                        hideLabel
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
                name: "Rating Input",
                href: "/RatingInputPage",
                component: <RatingInput />,
            },
            {
                name: "Toggle Input",
                href: "/ToggleInputPage",
                component: (
                    <ToggleInput
                        iconSet={Octicons}
                        onChange={() => null}
                        iconName="check"
                        label="Toggle Input"
                    />
                ),
            },
        ],
    },
    {
        sectionName: "Layouts",
        data: [{ name: "Form Layout", href: "/FormPage" }],
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
                name: "Rating",
                href: "/RatingPage",
                component: <Rating value={3} max={5} />,
            },
        ],
    },
];

const ComponentListScreen: React.FC = () => {
    const router = useRouter();
    const { theme } = useTheme();

    const styles = useThemedStyles(createStyles);

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
                        fontFamily: theme.font.family.sans,
                        fontWeight: "800",
                    },
                    headerBackTitleStyle: {
                        fontFamily: theme.font.family.sans,
                        fontSize: theme.font.size.regular,
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
                            iconSet={Octicons}
                            label="Common Props"
                            iconName={collapsed ? "chevron-down" : "chevron-up"}
                            iconPosition="right"
                            onPress={() => setCollapsed((prev) => !prev)}
                        />
                        <Panel
                            collapsed={collapsed}
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
                        </Panel>
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
                                    <ListItemAlert>
                                        <View style={styles.listItemDisplay}>
                                            {React.cloneElement(component, {
                                                ...component.props,
                                                variant,
                                            })}
                                        </View>
                                    </ListItemAlert>
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
        listItemDisplay: {
            width: 150,
            alignItems: "flex-end",
            paddingVertical: 8,
        },
    });

export default ComponentListScreen;
