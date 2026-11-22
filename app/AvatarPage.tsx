import type { FunctionComponent } from "react";
import Octicons from "@react-native-vector-icons/octicons";
import { IconAction } from "@reillymc/react-native-components/actions";
import {
    Avatar,
    type AvatarProps,
} from "@reillymc/react-native-components/display";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";

const propDefinitions: PropDefinitions<AvatarProps> = {
    firstName: {
        type: "string",
        label: "First Name",
        default: "",
    },
    lastName: {
        type: "string",
        label: "Last Name",
        default: "",
    },
    imageUri: enumPropDefinition({
        label: "Image URL",
        default: "none",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                label: "David",
                value: "https://randomuser.me/api/portraits/men/19.jpg",
            },
            {
                label: "Mark",
                value: "https://randomuser.me/api/portraits/men/20.jpg",
            },
        ],
    }),
    size: enumPropDefinition({
        label: "Size",
        default: "regular",
        values: [
            { label: "Small", value: "small" },
            { label: "Regular", value: "regular" },
            { label: "Large", value: "large" },
        ],
    }),
    action: enumPropDefinition({
        label: "Action",
        default: "close",
        values: [
            { id: "none", label: "None", value: undefined },
            {
                id: "close",
                label: "Close",
                value: (
                    <IconAction
                        iconSet={Octicons}
                        iconName="x-circle"
                        onPress={() => null}
                    />
                ),
            },
            {
                id: "edit",
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
    }),
};

const AvatarPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Avatar"
            component={<Avatar {...props} />}
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

export default AvatarPage;
