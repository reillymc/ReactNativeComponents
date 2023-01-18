import React from "react";
import { Avatar, AvatarProps, IconAction } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

const defaultProps: AvatarProps = {
    firstName: "John",
    lastName: "Smith",
    imageUri: undefined,
    size: "regular",
    action: <IconAction iconName="closecircle" onPress={() => null} size={"regular"} />,
};

const propDefinitions: PropDefinitions<AvatarProps> = {
    firstName: {
        type: "string",
        label: "First Name",
    },
    lastName: {
        type: "string",
        label: "Last Name",
    },
    imageUri: {
        type: "enum",
        label: "Image URL",
        values: [
            { id: "None", label: "None", value: undefined },
            { label: "David", value: "https://randomuser.me/api/portraits/men/19.jpg" },
            { label: "Mark", value: "https://randomuser.me/api/portraits/men/20.jpg" },
        ],
    },
    size: {
        type: "enum",
        label: "Size",
        default: "Regular",
        values: [
            { label: "Small", value: "small" },
            { label: "Regular", value: "regular" },
            { label: "Large", value: "large" },
        ],
    },
    action: {
        type: "enum",
        label: "Action",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Close", label: "Close", value: defaultProps.action },
            { id: "Edit", label: "Edit", value: <IconAction iconName="edit" onPress={() => null} size={"regular"} /> },
        ],
    },
};

export const AvatarPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<AvatarProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Avatar"
            component={<Avatar {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => setProps(prev => ({ ...prev, [propId]: value }))}
                />
            }
        />
    );
};
