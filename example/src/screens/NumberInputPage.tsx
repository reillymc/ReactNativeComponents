import React from "react";
import { Text, NumberInput, NumberInputProps } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";

const propDefinitions: PropDefinitions<NumberInputProps> = {
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

const defaultProps: NumberInputProps = {
    placeholder: "0",
    width: "large",
    disabled: false,
};

export const NumberInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<NumberInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Number Input"
            component={<NumberInput {...props} />}
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
