import React from "react";
import {
    TextInput,
    type TextInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<TextInputProps> = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    mandatory: {
        type: "boolean",
        label: "Mandatory",
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    label: {
        type: "string",
        label: "Label",
    },
    helpText: {
        type: "string",
        label: "Help text",
    },
    clearButtonMode: {
        type: "enum",
        label: "Clear button mode",
        default: "Never",
        values: [
            { label: "Never", value: "never" },
            { label: "While editing", value: "while-editing" },
            { label: "Unless editing", value: "unless-editing" },
            { label: "Always", value: "always" },
        ],
    },
    hasError: {
        type: "boolean",
        label: "Has error",
    },
};

const defaultProps: TextInputProps = {
    placeholder: "Text Input",
    disabled: false,
};

const TextInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<TextInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Text Input"
            component={<TextInput {...props} />}
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

export default TextInputPage;
