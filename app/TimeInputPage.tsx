import React from "react";
import {
    TimeInput,
    type TimeInputProps,
    type TimeInputValue,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<TimeInputProps> = {
    hoursPlaceholder: {
        type: "string",
        label: "Hours placeholder text",
    },
    minutesPlaceholder: {
        type: "string",
        label: "Minutes placeholder 2 text",
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    mandatory: {
        type: "boolean",
        label: "Mandatory",
    },
    label: {
        type: "string",
        label: "Label",
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
