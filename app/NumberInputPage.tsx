import React from "react";
import {
    NumberInput,
    type NumberInputProps,
    type NumberInputValue,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { CommonInputProps } from "../demo/helpers";

const propDefinitions: PropDefinitions<NumberInputProps> = {
    ...CommonInputProps,
    placeholder2: {
        type: "string",
        label: "Placeholder 2 text",
    },
    enabledRepresentations: {
        type: "enum",
        label: "Enabled Modes",
        default: "All",
        values: [
            { id: "number", label: "Number", value: ["number"] },
            { id: "fraction", label: "Fraction", value: ["fraction"] },
            { id: "range", label: "Range", value: ["range"] },
            {
                id: "number-fraction",
                label: "Number and Fraction",
                value: ["number", "fraction"],
            },
            {
                id: "number-range",
                label: "Number and Range",
                value: ["number", "range"],
            },
            {
                id: "fraction-range",
                label: "Fraction and Range",
                value: ["fraction", "range"],
            },
            { id: "all", label: "All", value: ["number", "fraction", "range"] },
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
};

const defaultProps: NumberInputProps = {
    placeholder: "0",
    placeholder2: "0",
    disabled: false,
};

const NumberInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<NumberInputProps>(defaultProps);
    const [inputValue, setInputValue] = React.useState<NumberInputValue>();

    console.debug(inputValue);

    return (
        <ComponentPage
            componentName="Number Input"
            component={
                <NumberInput
                    {...props}
                    value={inputValue}
                    onChange={setInputValue}
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

export default NumberInputPage;
