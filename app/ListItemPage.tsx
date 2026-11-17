import type { FunctionComponent } from "react";
import Octicons from "@react-native-vector-icons/octicons";
import {
    IconAction,
    SwipeAction,
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
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { InteractionPropDefinitions } from "../demo/helpers";

const deleteAction = (
    <SwipeAction
        key="delete"
        label="Delete"
        iconSet={Octicons}
        iconName="trash"
        variant="destructive"
        onPress={() => null}
    />
);

const editAction = (
    <SwipeAction
        key="edit"
        label="Edit"
        iconSet={Octicons}
        iconName="pencil"
        variant="primary"
        onPress={() => null}
    />
);

const deleteAndEditActions = [deleteAction, editAction];

const propDefinitions: PropDefinitions<ListItemProps> = {
    heading: {
        type: "string",
        label: "Heading text",
        default: "Heading text",
    },
    header: enumPropDefinition({
        label: "Header",
        default: "none",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "text",
                label: "Text",
                value: <Text variant="caption">Header text</Text>,
            },
        ],
    }),
    footer: enumPropDefinition({
        label: "Footer",
        default: "contentRow",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "text",
                label: "Text",
                value: <Text variant="caption">Footer text</Text>,
            },
            {
                id: "contentRow",
                label: "Content row",
                value: (
                    <ContentRow>
                        <Text variant="caption">Footer text</Text>
                        <Text variant="caption">Footer text 2</Text>
                    </ContentRow>
                ),
            },
        ],
    }),
    avatar: enumPropDefinition({
        label: "Avatar",
        default: "icon",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "icon",
                label: "Icon",
                value: (
                    <IconAction
                        iconSet={Octicons}
                        onPress={() => null}
                        iconName="apps"
                        variant="primary"
                    />
                ),
            },
        ],
    }),
    content: enumPropDefinition({
        label: "Content",
        default: "one",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "one",
                label: "One",
                value: (
                    <ContentRow>
                        <Text>Description</Text>
                        <Text>Description 2</Text>
                    </ContentRow>
                ),
            },
            {
                id: "two",
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
                id: "three",
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
    }),
    actions: enumPropDefinition({
        label: "Swipe actions",
        default: "deleteAndEdit",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "delete",
                label: "Delete",
                value: [deleteAction],
            },
            {
                id: "deleteAndEdit",
                label: "Delete and Edit",
                value: deleteAndEditActions,
            },
        ],
    }),
    alert: enumPropDefinition({
        label: "Alert",
        default: "alert",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "alert",
                label: "Alert",
                value: <Badge variant="primary" label="8" />,
            },
        ],
    }),
    corners: enumPropDefinition({
        label: "Corners",
        default: "rounded",
        values: [
            { label: "Rounded", value: "rounded" },
            { label: "Square", value: "square" },
        ],
    }),
    onPress: InteractionPropDefinitions.onPress,
};

const ListItemPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="List Item"
            component={<ListItem {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={onChange}
                />
            }
        />
    );
};

export default ListItemPage;
