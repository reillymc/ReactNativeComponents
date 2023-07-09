import React from "react";
import { IconButton, IconButtonProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItems } from "../helpers";

const defaultProps: IconButtonProps = {
    label: "Action",
    iconName: "close",
    variant: "secondary",
    size: "regular",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<IconButtonProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItems,
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Flat", value: "flat" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    size: {
        type: "enum",
        label: "Size",
        values: [
            { label: "Small", value: "small" },
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
    const [props, setProps] = React.useState<IconButtonProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Icon Button"
            component={<IconButton {...props} />}
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

export default IconButtonPage;
