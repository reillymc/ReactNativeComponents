import React from "react";
import {
    TimeInput,
    type TimeInputProps,
    type TimeInputValue,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import {
    InputBasePropDefinitions,
    InputScaffoldPropDefinitions,
} from "../demo/helpers";

const propDefinitions: PropDefinitions<TimeInputProps> = {
    label: InputScaffoldPropDefinitions.label,
    helpText: InputScaffoldPropDefinitions.helpText,
    variant: InputBasePropDefinitions.variant,
    mandatory: InputScaffoldPropDefinitions.mandatory,
    disabled: InputBasePropDefinitions.disabled,
    hoursPlaceholder: {
        type: "string",
        label: "Hours placeholder text",
    },
    minutesPlaceholder: {
        type: "string",
        label: "Minutes placeholder 2 text",
    },
};

const defaultProps: TimeInputProps = {
    hoursPlaceholder: "0",
    minutesPlaceholder: "0",
    disabled: false,
};

const TimeInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<TimeInputProps>(defaultProps);
    const [inputValue, setInputValue] = React.useState<TimeInputValue>();

    console.debug(inputValue);

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
