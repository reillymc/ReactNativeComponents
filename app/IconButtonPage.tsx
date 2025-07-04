import React from "react";
import { Octicons } from "@expo/vector-icons";
import {
    IconButton,
    type IconButtonProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItemsOcticons } from "../helpers";

const defaultProps: IconButtonProps<any, any> = {
    iconSet: Octicons,
    iconName: "arrow-both",
    variant: "primary",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<IconButtonProps<any, any>> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        default: defaultProps.iconName,
        values: glyphMapValueItemsOcticons,
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: defaultProps.variant,
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
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
    size: {
        type: "enum",
        label: "Size",
        values: [
            { label: "Regular", value: "regular" },
            { label: "Large", value: "large" },
        ],
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
};

const IconButtonPage: React.FunctionComponent = () => {
    const [props, setProps] =
        React.useState<IconButtonProps<any, any>>(defaultProps);

    return (
        <ComponentPage
            componentName="Icon Button"
            component={<IconButton {...props} />}
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

export default IconButtonPage;
