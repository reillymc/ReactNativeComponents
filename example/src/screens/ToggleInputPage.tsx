import React from "react";
import { Text, ToggleInput, ToggleInputProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItemsNullable } from "../helpers";

const propDefinitions: PropDefinitions<ToggleInputProps> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        default: "check",
        values: glyphMapValueItemsNullable,
    },
    label: {
        type: "enum",
        label: "Label",
        default: "None",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "String", label: "String label", value: "String label" },
            {
                id: "Component",
                label: "Text Component",
                value: <Text variant="body">Text component label</Text>,
            },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Flat", value: "flat" },
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
    helpText: {
        type: "string",
        label: "Help text",
    },
    onChange: {
        type: "function",
        label: "Change action",
    },
};

const defaultProps: ToggleInputProps = {
    iconName: "check",
    disabled: false,
    onChange: () => null,
    variant: "primary",
};

export const ToggleInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<ToggleInputProps>(defaultProps);

    const [toggled, setToggled] = React.useState(false);

    return (
        <ComponentPage
            componentName="Toggle Input"
            component={<ToggleInput {...props} onChange={setToggled} value={toggled} />}
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
