import { type FunctionComponent, useState } from "react";
import {
    CounterInput,
    type CounterInputProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { CommonInputProps } from "../demo/helpers";

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
