import { cloneElement, type FC, type ReactElement, useState } from "react";
import {
    Appearance,
    SectionList,
    type SectionListData,
    View,
} from "react-native";
import { type Href, Stack, useRouter } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import {
    Action,
    Button,
    IconAction,
    IconButton,
} from "@reillymc/react-native-components/actions";
import {
    Avatar,
    Badge,
    ListItem,
    Rating,
    Tag,
} from "@reillymc/react-native-components/display";
import {
    ComboboxInput,
    CounterInput,
    NumberInput,
    RatingInput,
    SelectionInput,
    TextInput,
    TimeInput,
    ToggleInput,
} from "@reillymc/react-native-components/forms";
import { Icon } from "@reillymc/react-native-components/icons";
import { CollapsiblePanel } from "@reillymc/react-native-components/layout";
import { usePalette } from "@reillymc/react-native-components/theme";
import {
    HighlightedText,
    Text,
} from "@reillymc/react-native-components/typography";

import { defineStyles, useStyles } from "../demo/theme";

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
            { name: "Swipe Action", href: "/SwipeActionPage" },
        ],
    },
    {
        sectionName: "Display",
        data: [
            { name: "List Item", href: "/ListItemPage" },
            { name: "Content Row", href: "/ContentRowPage" },
            {
                name: "Avatar",
                href: "/AvatarPage",
                component: <Avatar firstName="First" lastName="Last" />,
            },
            { name: "Tag", href: "/TagPage", component: <Tag label="Tag" /> },
            {
                name: "Rating",
                href: "/RatingPage",
                component: <Rating value={3} max={5} />,
            },
            {
                name: "Badge",
                href: "/BadgePage",
                component: <Badge label="8" />,
            },
        ],
    },
    {
        sectionName: "Feedback",
        data: [{ name: "Toast", href: "/ToastPage" }],
    },
    {
        sectionName: "Forms",
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
                component: <NumberInput placeholder={{ value: "0" }} />,
            },
            {
                name: "Time Input",
                href: "/TimeInputPage",
                component: (
                    <TimeInput placeholder={{ hours: "0", minutes: "0" }} />
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
                name: "Combobox Input",
                href: "/ComboboxInputPage",
                component: <ComboboxInput placeholder="Combobox Input" />,
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
            { name: "Form Layout", href: "/FormPage" },
        ],
    },
    {
        sectionName: "Layout",
        data: [
            {
                name: "Collapsible Panel",
                href: "/CollapsiblePanelPage",
            },
            { name: "Swipeable Container", href: "/SwipeableContainerPage" },
        ],
    },
    {
        sectionName: "Overlays",
        data: [{ name: "Menu", href: "/MenuPage" }],
    },
    {
        sectionName: "Typography",
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
        sectionName: "Icons",
        data: [
            {
                name: "Icon",
                href: "/IconPage",
                component: <Icon iconSet={Octicons} iconName="star" />,
            },
            { name: "Built-in Icons", href: "/UiIconsPage" },
        ],
    },
];

const ComponentListScreen: FC = () => {
    const router = useRouter();
    const palette = usePalette();
    const styles = useStyles(createStyles);

    const [collapsed, setCollapsed] = useState(true);
    const [variant, setVariant] = useState<"primary" | "destructive">();

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Components",
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerLargeTitleStyle: {
                        fontFamily: palette.font.family.sans,
                        fontWeight: "800",
                    },
                    headerBackTitleStyle: {
                        fontFamily: palette.font.family.sans,
                        fontSize: palette.font.size.regular,
                    },
                    headerLargeStyle: {
                        backgroundColor: palette.color.background,
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
                        <View style={styles.schemeRow}>
                            <Action
                                label="Light"
                                variant="secondary"
                                onPress={() =>
                                    Appearance.setColorScheme("light")
                                }
                            />
                            <Action
                                label="Dark"
                                variant="secondary"
                                onPress={() =>
                                    Appearance.setColorScheme("dark")
                                }
                            />
                            <Action
                                label="System"
                                variant="secondary"
                                onPress={() =>
                                    Appearance.setColorScheme("unspecified")
                                }
                            />
                        </View>
                        <IconAction
                            iconSet={Octicons}
                            label="Common Props"
                            iconName={collapsed ? "chevron-down" : "chevron-up"}
                            iconPosition="end"
                            onPress={() => setCollapsed((prev) => !prev)}
                        />
                        <CollapsiblePanel
                            collapsed={collapsed}
                            style={styles.propsContainer}
                        >
                            <ComboboxInput
                                placeholder="Variant"
                                value={variant}
                                onChange={(item) => setVariant(item?.value)}
                                items={[
                                    { label: "Primary", value: "primary" },
                                    {
                                        label: "Destructive",
                                        value: "destructive",
                                    },
                                ]}
                            />
                        </CollapsiblePanel>
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
                                    <View style={styles.listItemDisplay}>
                                        {cloneElement(component, {
                                            ...component.props,
                                            variant,
                                        })}
                                    </View>
                                )
                            }
                        />
                    );
                }}
                contentContainerStyle={styles.content}
            />
        </>
    );
};

const createStyles = defineStyles(({ palette, appTheme }) => ({
    content: {
        backgroundColor: appTheme.page.backgroundColor,
        paddingHorizontal: appTheme.page.horizontal,
        paddingTop: appTheme.page.top,
        paddingBottom: appTheme.page.bottom,
    },
    listHeader: {
        alignItems: "flex-end",
    },
    schemeRow: {
        flexDirection: "row",
        gap: palette.spacing.small,
        alignSelf: "flex-start",
    },
    propsContainer: {
        height: 120,
        marginTop: 20,
        width: "100%",
    },
    sectionHeading: {
        marginTop: palette.spacing.small,
        marginBottom: palette.spacing.small,
        marginLeft: palette.spacing.medium,
    },
    listItemDisplay: {
        width: 150,
        alignItems: "flex-end",
        paddingVertical: 8,
    },
}));

export default ComponentListScreen;
