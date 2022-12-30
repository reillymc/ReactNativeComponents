import React from "react";
import { Text, TextInput, TextInputProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<TextInputProps> = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    width: {
        type: "enum",
        label: "Width",
        default: "Large",
        values: [
            { label: "Small", value: "small" },
            { label: "Large", value: "large" },
            { label: "Full", value: "full" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    label: {
        type: "enum",
        label: "Label",
        default: "None",
        values: [
            { label: "None", value: undefined },
            { label: "Text", value: "Example label" },
            { label: "Text Component", value: <Text variant="label">Example component label</Text> },
        ],
    },
};

const defaultProps: TextInputProps = {
    placeholder: "Text Input",
    width: "large",
    disabled: false,
};

export const TextInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<TextInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Text Input"
            component={<TextInput {...props} />}
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
