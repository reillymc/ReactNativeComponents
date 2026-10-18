import { type FunctionComponent, useState } from "react";
import Octicons from "@react-native-vector-icons/octicons";
import {
    Avatar,
    type AvatarProps,
    IconAction,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: AvatarProps = {
    firstName: "John",
    lastName: "Smith",
    imageUri: undefined,
    size: "regular",
    action: (
        <IconAction
            iconSet={Octicons}
            iconName="x-circle"
            onPress={() => null}
        />
    ),
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
            {
                label: "David",
                value: "https://randomuser.me/api/portraits/men/19.jpg",
            },
            {
                label: "Mark",
                value: "https://randomuser.me/api/portraits/men/20.jpg",
            },
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
            {
                id: "Edit",
                label: "Edit",
                value: (
                    <IconAction
                        iconSet={Octicons}
                        iconName="pencil"
                        onPress={() => null}
                    />
                ),
            },
        ],
    },
};

const AvatarPage: FunctionComponent = () => {
    const [props, setProps] = useState<AvatarProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Avatar"
            component={<Avatar {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) =>
                        setProps((prev) => ({ ...prev, [propId]: value }))
                    }
                />
            }
        />
    );
};

export default AvatarPage;
