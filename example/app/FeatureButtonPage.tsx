import React from "react";
import { FeatureButton, FeatureButtonProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItems } from "../helpers";

const defaultProps: FeatureButtonProps = {
    label: "Action",
    iconName: "close",
    variant: "secondary",
    size: "regular",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<FeatureButtonProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    iconName: {
        type: "enum",
        label: "Feature Name",
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

const FeatureButtonPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<FeatureButtonProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Feature Button"
            component={<FeatureButton {...props} />}
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

export default FeatureButtonPage;
