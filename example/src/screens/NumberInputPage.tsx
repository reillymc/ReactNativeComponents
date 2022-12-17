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
    keyboardType: {
        type: "enum",
        label: "Keyboard Type",
        default: "Number Pad",
        values: [
            { label: "Number", value: "number-pad" },
            { label: "Decimal", value: "decimal-pad" },
        ],
    },
    min: {
        type: "number",
        label: "Min Value",
    },
    max: {
        type: "number",
        label: "Max Value",
    },
};

const defaultProps: NumberInputProps = {
    placeholder: "0",
    width: "large",
    disabled: false,
    keyboardType: "number-pad",
};

export const NumberInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<NumberInputProps>(defaultProps);
    const [value, setValue] = React.useState<string | undefined>(undefined);

    return (
        <ComponentPage
            componentName="Number Input"
            component={<NumberInput {...props} value={value} onChangeText={text => setValue(text)} />}
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
