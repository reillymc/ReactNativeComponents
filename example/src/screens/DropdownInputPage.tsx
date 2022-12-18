import React from "react";
import { DropdownInput, DropdownInputProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

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
        type: "enum",
        label: "Width",
        default: "Large",
        values: [
            { label: "Small", value: "small" },
            { label: "Large", value: "large" },
            { label: "Full", value: "full" },
        ],
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
            component={
                <DropdownInput
                    {...props}
                    onSelect={e => setProps(prev => ({ ...prev, selectedItem: e }))}
                    containerStyle={{ width: "50%", marginLeft: 20 }}
                />
            }
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
