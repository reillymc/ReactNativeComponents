import React from "react";
import { SelectionInput, SelectionInputProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

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
        type: "enum",
        label: "Width",
        default: "Large",
        values: [
            { label: "Small", value: "small" },
            { label: "Large", value: "large" },
            { label: "Full", value: "full" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    selectionMode: {
        type: "enum",
        label: "Selection mode",
        values: [
            { label: "Single", value: "single" as any },
            { label: "Multi", value: "multi" },
        ],
    },
    onChange: {
        label: "Press action",
        type: "function",
    },
};

const defaultProps: SelectionInputProps = {
    label: "Selection Input",
    disabled: false,
    items: [
        { label: "Item", value: "item1" },
        { label: "Item 2", value: "item2" },
        { label: "Item 3", value: "item3" },
        { label: "Item 4", value: "item4" },
        { label: "Item 5", value: "item5" },
    ],
    placeholder: "Select an item",
    selectionMode: "single",
    width: "large",
    onChange: () => null,
};

export const SelectionInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<SelectionInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Selection Input"
            component={
                <SelectionInput {...props} onChange={(e: any) => setProps(prev => ({ ...prev, selection: e }))} />
            }
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => {
                        if (propId === "selectionMode") {
                            setProps(prev => ({ ...prev, selection: undefined }));
                        }
                        setProps(prev => ({ ...prev, [propId]: value }));
                    }}
                />
            }
        />
    );
};
