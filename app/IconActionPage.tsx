import React from "react";
import { Octicons } from "@expo/vector-icons";
import {
    IconAction,
    type IconActionProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItemsOcticons } from "../helpers";

const defaultProps: IconActionProps<any, any> = {
    label: "Secondary IconAction",
    iconName: "arrow-both",
    variant: "secondary",
    iconSet: Octicons,
    onPress: () => null,
};

const propDefinitions: PropDefinitions<IconActionProps<any, any>> = {
    label: {
        type: "string",
        label: "Label",
    },
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItemsOcticons,
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    },
    iconPosition: {
        type: "enum",
        label: "Icon position",
        default: "left",
        values: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    iconSet: {
        type: "enum",
        label: "Icon Set",
        values: [
            {
                id: "octicons",
                label: "Octicons",
                value: Octicons,
            },
        ],
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
};

const IconActionPage: React.FunctionComponent = () => {
    const [props, setProps] =
        React.useState<IconActionProps<any, any>>(defaultProps);

    return (
        <ComponentPage
            componentName="IconAction"
            component={<IconAction {...props} />}
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

export default IconActionPage;
