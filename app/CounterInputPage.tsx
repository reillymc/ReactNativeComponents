import { type FunctionComponent, useState } from "react";
import {
    CounterInput,
    type CounterInputProps,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import {
    FieldPropDefinitions,
    FieldTextInputPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<CounterInputProps> = {
    label: FieldPropDefinitions.label,
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    placeholder: FieldTextInputPropDefinitions.placeholder,
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
    disableKeyboardInput: {
        type: "boolean",
        label: "Disable Keyboard Input",
    },
};

const defaultProps: CounterInputProps = {
    placeholder: "0",
    disabled: false,
    label: "Counter Input",
};

const CounterInputPage: FunctionComponent = () => {
    const [props, setProps] = useState<CounterInputProps>(defaultProps);
    const [inputValue, setInputValue] = useState<string | undefined>(undefined);

    return (
        <ComponentPage
            componentName="Counter Input"
            component={
                <CounterInput
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

export default CounterInputPage;
