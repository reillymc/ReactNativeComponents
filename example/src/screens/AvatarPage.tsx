import React from "react";
import { Avatar, AvatarProps, IconAction } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";

const defaultProps: AvatarProps = {
    firstName: "John",
    lastName: "Smith",
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
    action: {
        type: "enum",
        label: "Action",
        values: [
            { label: "None", value: undefined },
            { label: "Close", value: defaultProps.action },
            {
                label: "Edit",
                value: <IconAction iconName="edit" onPress={() => null} size={"regular"} />,
            },
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
