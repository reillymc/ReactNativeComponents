import { type FunctionComponent, useState } from "react";
import Octicons from "@react-native-vector-icons/octicons";
import {
    ContextAction,
    IconAction,
} from "@reillymc/react-native-components/actions";
import {
    Badge,
    ContentRow,
    ListItem,
    type ListItemProps,
} from "@reillymc/react-native-components/display";
import { Text } from "@reillymc/react-native-components/typography";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const headerContent = <Text variant="caption">Header text</Text>;

const footerText = <Text variant="caption">Footer text</Text>;

const footerContentRow = (
    <ContentRow>
        <Text variant="caption">Footer text</Text>
        <Text variant="caption">Footer text 2</Text>
    </ContentRow>
);

const defaultProps: ListItemProps = {
    heading: "Heading text",
    corners: "rounded",
    footer: footerContentRow,
    avatar: (
        <IconAction
            iconSet={Octicons}
            onPress={() => null}
            iconName="apps"
            variant="primary"
        />
    ),
    alert: <Badge variant="primary" label="8" />,
    content: (
        <ContentRow>
            <Text>Description</Text>
            <Text>Description 2</Text>
        </ContentRow>
    ),
    actions: [
        <ContextAction
            key="1"
            label="Delete"
            iconSet={Octicons}
            iconName={"trash"}
            variant="destructive"
            onPress={() => null}
        />,
        <ContextAction
            key="2"
            label="Edit"
            iconSet={Octicons}
            iconName="pencil"
            variant="primary"
            onPress={() => null}
        />,
    ],
    onPress: () => null,
};

const propDefinitions: PropDefinitions<ListItemProps> = {
    heading: {
        type: "string",
        label: "Heading text",
    },
    header: {
        type: "enum",
        label: "Header",
        default: "None",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Text", label: "Text", value: headerContent },
        ],
    },
    footer: {
        type: "enum",
        label: "Footer",
        default: "Content row",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Text", label: "Text", value: footerText },
            {
                id: "ContentRow",
                label: "Content row",
                value: footerContentRow,
            },
        ],
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
    content: {
        type: "enum",
        label: "Content",
        default: "One",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "One", label: "One", value: defaultProps.content },
            {
                id: "Two",
                label: "Two",
                value: (
                    <>
                        <ContentRow>
                            <Text>Description</Text>
                            <Text>Description 2</Text>
                        </ContentRow>
                        <ContentRow>
                            <Text>Description</Text>
                            <Text>Description 2</Text>
                        </ContentRow>
                    </>
                ),
            },
            {
                id: "Three",
                label: "Three",
                value: (
                    <>
                        <ContentRow>
                            <Text>Description</Text>
                            <Text>Description 2</Text>
                        </ContentRow>
                        <ContentRow>
                            <Text>Description</Text>
                        </ContentRow>
                        <ContentRow>
                            <Text>Description</Text>
                            <Text>Description 2</Text>
                        </ContentRow>
                    </>
                ),
            },
        ],
    },
    actions: {
        type: "enum",
        label: "Actions",
        default: "Delete",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Delete", label: "Delete", value: defaultProps.actions },
            {
                id: "DeleteAndEdit",
                label: "Delete and Edit",
                value: [
                    <ContextAction
                        key="1"
                        label="Delete"
                        iconSet={Octicons}
                        iconName="trash"
                        variant="destructive"
                        onPress={() => null}
                    />,
                    <ContextAction
                        key="2"
                        label="Edit"
                        iconSet={Octicons}
                        iconName="pencil"
                        variant="primary"
                        onPress={() => null}
                    />,
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
                value: <Badge variant="primary" label="3" />,
            },
        ],
    },
    corners: {
        type: "enum",
        label: "Corners",
        default: "Rounded",
        values: [
            { label: "Rounded", value: "rounded" },
            { label: "Square", value: "square" },
        ],
    },
    onPress: {
        type: "function",
        label: "On press",
    },
};

const ListItemPage: FunctionComponent = () => {
    const [props, setProps] = useState<ListItemProps>(defaultProps);

    return (
        <ComponentPage
            componentName="List Item"
            component={<ListItem {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => {
                        setProps((prev) => ({ ...prev, [propId]: value }));
                    }}
                />
            }
        />
    );
};

export default ListItemPage;
