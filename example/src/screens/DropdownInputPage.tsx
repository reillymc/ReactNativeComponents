import React from "react";
import { DropdownInput, DropdownInputProps } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";

const propDefinitions: PropDefinitions<DropdownInputProps> = {
    items: {
        type: "array",
        values: ["one", "two", "three"],
    },
    onSelect: {
        type: "function",
    },
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    width: {
        type: "array",
        values: ["small", "large", "full"],
    },
};

const defaultProps: DropdownInputProps = {
    placeholder: "Dropdown Input",
    items: [
        { id: "1", label: "Item 1" },
        { id: "2", label: "Item 2" },
        { id: "3", label: "Item 3" },
    ],
    onSelect: () => null,
};

export const DropdownInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<DropdownInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="DropdownInput"
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
