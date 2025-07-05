import React from "react";
import {
    CounterInput,
    type CounterInputProps,
    Text,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<CounterInputProps> = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
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
            { id: "None", label: "None", value: undefined },
            { id: "Text", label: "Text", value: "Example label" },
            {
                id: "TextComponent",
                label: "Text Component",
                value: <Text variant="label">Example component label</Text>,
            },
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

const defaultProps: CounterInputProps = {
    placeholder: "0",
    disabled: false,
};

const CounterInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<CounterInputProps>(defaultProps);
    const [inputValue, setInputValue] = React.useState<string | undefined>(
        undefined,
    );

    return (
        <ComponentPage
            componentName="Counter Input"
            component={
                <CounterInput
                    {...props}
                    value={inputValue}
                    onChangeText={setInputValue}
                />
            }
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

export default CounterInputPage;
