import { type FunctionComponent, useState } from "react";
import {
    CounterInput,
    type CounterInputProps,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    FieldPropDefinitions,
    FieldTextInputPropDefinitions,
    InputPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<CounterInputProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Counter Input",
    },
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    placeholder: FieldTextInputPropDefinitions.placeholder,
    keyboardType: InputPropDefinitions.keyboardType,
    min: {
        type: "number",
        label: "Min Value",
        default: 0,
    },
    max: {
        type: "number",
        label: "Max Value",
        default: Number.MAX_VALUE,
    },
    disableKeyboardInput: {
        type: "boolean",
        label: "Disable Keyboard Input",
        default: false,
    },
};

const CounterInputPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);
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
                    onChange={onChange}
                />
            }
        />
    );
};

export default CounterInputPage;
