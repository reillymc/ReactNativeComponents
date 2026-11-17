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
    useComponentProps,
} from "../demo/components";
import { ContentPropDefinitions, FieldPropDefinitions } from "../demo/helpers";

const propDefinitions: PropDefinitions<TimeInputProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Time Input",
    },
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    placeholder: {
        type: "hidden",
        default: {
            hours: "0",
            minutes: "0",
        },
    },
};

const TimeInputPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);
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
                    onChange={onChange}
                />
            }
        />
    );
};

export default TimeInputPage;
