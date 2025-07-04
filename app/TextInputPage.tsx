import React from "react";
import {
    Text,
    TextInput,
    type TextInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<TextInputProps> = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    width: {
        type: "enum",
        label: "Width",
        default: "Large",
        values: [
            { label: "Small", value: "small" },
            { label: "Large", value: "large" },
            { label: "Full", value: "full" },
        ],
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
        type: "enum",
        label: "Label",
        default: "None",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Text", label: "Text", value: "Example label" },
            {
                id: "TextComponent",
                label: "Text Component",
                value: <Text variant="label">Example component label</Text>,
            },
        ],
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
    width: "large",
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
