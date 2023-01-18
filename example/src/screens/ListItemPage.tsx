import React from "react";
import {
    IconAction,
    ListItem,
    ListItemProps,
    Text,
    ListItemRow,
    SwipeAction,
    AlertIndicator,
    ListItemAvatar,
    ListItemAlert,
} from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

const defaultProps: ListItemProps = {
    heading: "Heading text",
    avatar: (
        <ListItemAvatar>
            <IconAction onPress={() => null} iconName="API" />
        </ListItemAvatar>
    ),
    alert: undefined,
    contentRows: [
        <ListItemRow key={1} contentItems={[<Text key={1}>Description</Text>, <Text key={2}>Description 2</Text>]} />,
    ],
    swipeActions: [<SwipeAction key="1" iconName="delete" variant="destructive" label="" onPress={() => null} />],
    onPress: () => null,
};

const propDefinitions: PropDefinitions<ListItemProps> = {
    heading: {
        type: "string",
        label: "Heading text",
    },
    avatar: {
        type: "enum",
        label: "Avatar",
        default: "Icon",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Icon", label: "Icon", value: defaultProps.avatar },
        ],
    },
    contentRows: {
        type: "enum",
        label: "Content rows",
        default: "One",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "One", label: "One", value: defaultProps.contentRows },
            {
                id: "Two",
                label: "Two",
                value: [
                    <ListItemRow
                        key={1}
                        contentItems={[<Text key={1}>Description</Text>, <Text key={2}>Description 2</Text>]}
                    />,
                    <ListItemRow
                        key={2}
                        contentItems={[<Text key={1}>Description</Text>, <Text key={2}>Description 2</Text>]}
                    />,
                ],
            },
            {
                id: "Three",
                label: "Three",
                value: [
                    <ListItemRow
                        key={1}
                        contentItems={[<Text key={1}>Description</Text>, <Text key={2}>Description 2</Text>]}
                    />,
                    <ListItemRow key={2} contentItems={[<Text key={1}>Description</Text>]} />,
                    <ListItemRow
                        key={3}
                        contentItems={[<Text key={1}>Description</Text>, <Text key={2}>Description 2</Text>]}
                    />,
                ],
            },
        ],
    },
    swipeActions: {
        type: "enum",
        label: "Swipe actions",
        default: "Delete",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Delete", label: "Delete", value: defaultProps.swipeActions },
            {
                id: "DeleteAndEdit",
                label: "Delete and Edit",
                value: [
                    <SwipeAction key="1" iconName="delete" variant="destructive" label="" onPress={() => null} />,
                    <SwipeAction key="2" iconName="edit" variant="secondary" label="" onPress={() => null} />,
                ],
            },
        ],
    },
    alert: {
        type: "enum",
        label: "Alert",
        default: "None",
        values: [
            { id: "None", label: "None", value: undefined },
            {
                id: "Alert",
                label: "Alert",
                value: (
                    <ListItemAlert>
                        <AlertIndicator style={{ marginRight: 20 }} variant="primary" label="3" />
                    </ListItemAlert>
                ),
            },
        ],
    },
    onPress: {
        type: "function",
        label: "On press",
    },
};

export const ListItemPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<ListItemProps>(defaultProps);

    return (
        <ComponentPage
            componentName="List Item"
            component={<ListItem {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => {
                        setProps(prev => ({ ...prev, [propId]: value }));
                    }}
                />
            }
        />
    );
};
