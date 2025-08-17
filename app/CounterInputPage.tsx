import React from "react";
import {
    CounterInput,
    type CounterInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { CommonInputProps } from "../helpers";

const propDefinitions: PropDefinitions<CounterInputProps> = {
    ...CommonInputProps,
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
