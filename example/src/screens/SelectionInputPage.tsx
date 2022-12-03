import React from "react";
import { SelectionInput, SelectionInputProps } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";

const propDefinitions: PropDefinitions<SelectionInputProps> = {
    label: {
        label: "Label",
        type: "string",
    },
    placeholder: {
        label: "Placeholder",
        type: "string",
    },
    width: {
        label: "Size",
        type: "array",
        values: ["small", "regular", "large"],
    },
    disabled: {
        label: "Disabled",
        type: "boolean",
    },

    onSelect: {
        label: "Press action",
        type: "function",
    },
};

const defaultProps: SelectionInputProps = {
    label: "Secondary SelectionInput",
    disabled: false,
    items: [
        { label: "Item", value: "item1" },
        { label: "Item 2", value: "item2" },
        { label: "Item 3", value: "item3" },
    ],
    placeholder: "Select an item",
    selectedItem: { label: "Item 1", value: "item1" },
    width: "large",
    onSelect: () => null,
};

export const SelectionInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<SelectionInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Selection Input"
            component={<SelectionInput {...props} onSelect={e => setProps(prev => ({ ...prev, selectedItem: e }))} />}
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
