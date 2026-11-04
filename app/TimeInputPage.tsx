import { type FunctionComponent, useState } from "react";
import {
    TimeInput,
    type TimeInputProps,
    type TimeInputValue,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { FieldPropDefinitions } from "../demo/helpers";

const propDefinitions: PropDefinitions<TimeInputProps> = {
    label: FieldPropDefinitions.label,
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
};

const defaultProps: TimeInputProps = {
    placeholder: {
        hours: "0",
        minutes: "0",
    },
    disabled: false,
};

const TimeInputPage: FunctionComponent = () => {
    const [props, setProps] = useState<TimeInputProps>(defaultProps);
    const [inputValue, setInputValue] = useState<TimeInputValue>();

    return (
        <ComponentPage
            componentName="Time Input"
            component={
                <TimeInput
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

export default TimeInputPage;
