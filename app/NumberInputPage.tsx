import { type FunctionComponent, useState } from "react";
import {
    NumberInput,
    type NumberInputProps,
    type NumberInputValue,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    FieldPropDefinitions,
    InputPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<NumberInputProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Number Input",
    },
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    enabledRepresentations: enumPropDefinition({
        label: "Enabled Modes",
        default: "all",
        values: [
            {
                id: "number",
                label: "Number",
                value: ["number"],
            },
            {
                id: "fraction",
                label: "Fraction",
                value: ["fraction"],
            },
            {
                id: "range",
                label: "Range",
                value: ["range"],
            },
            {
                id: "numberFraction",
                label: "Number and Fraction",
                value: ["number", "fraction"],
            },
            {
                id: "numberRange",
                label: "Number and Range",
                value: ["number", "range"],
            },
            {
                id: "fractionRange",
                label: "Fraction and Range",
                value: ["fraction", "range"],
            },
            {
                id: "all",
                label: "All",
                value: ["number", "fraction", "range"],
            },
        ],
    }),
    keyboardType: InputPropDefinitions.keyboardType,
    placeholder: {
        type: "hidden",
        default: {
            value: "0",
            start: "0",
            end: "0",
            whole: "0",
            numerator: "0",
            denominator: "0",
        },
    },
};

const NumberInputPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);
    const [inputValue, setInputValue] = useState<NumberInputValue>();

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
                    onChange={onChange}
                />
            }
        />
    );
};

export default NumberInputPage;
