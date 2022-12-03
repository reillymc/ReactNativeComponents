import React from "react";
import { DropdownInput, DropdownInputProps } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";

const propDefinitions: PropDefinitions<DropdownInputProps> = {
    onSelect: {
        type: "function",
        label: "onSelect",
    },
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    width: {
        type: "array",
        label: "Width",
        values: ["small", "large", "full"],
    },
};

const defaultProps: DropdownInputProps = {
    placeholder: "Dropdown Input",
    items: [
        { value: "1", label: "Item 1" },
        { value: "2", label: "Item 2" },
        { value: "3", label: "Item 3" },
    ],
    width: "large",
    onSelect: () => null,
};

export const DropdownInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<DropdownInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Dropdown Input"
            component={<DropdownInput {...props} onSelect={e => setProps(prev => ({ ...prev, selectedItem: e }))} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => setProps(prev => ({ ...prev, [propId]: value }))}
                />
            }
        />
    );
};
