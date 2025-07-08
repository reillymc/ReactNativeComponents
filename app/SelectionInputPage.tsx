import React from "react";
import {
    SelectionInput,
    type SelectionInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<SelectionInputProps> = {
    label: {
        label: "Label",
        type: "string",
    },
    placeholder: {
        label: "Placeholder",
        type: "string",
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    mandatory: {
        type: "boolean",
        label: "Mandatory",
    },
    selectionMode: {
        type: "enum",
        label: "Selection mode",
        values: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { label: "Single", value: "single" as any },
            { label: "Multi", value: "multi" },
        ],
    },
    onRemoveItem: {
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
        { label: "Item 6", value: "item6" },
        { label: "Item 7", value: "item7" },
        { label: "Item 8", value: "item8" },
        { label: "Item 9", value: "item9" },
        { label: "Item 10", value: "item10" },
        { label: "Item 11", value: "item11" },
    ],
    placeholder: "Select an item",
    selectionMode: "single",
    selection: { label: "Item", value: "item1" },
    onRemoveItem: () => null,
};

const SelectionInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<SelectionInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Selection Input"
            component={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <SelectionInput
                    {...props}
                    onRemoveItem={(e: any) =>
                        setProps((prev) => ({
                            ...prev,
                            selection: (Array.isArray(prev.selection)
                                ? prev.selection.filter((x) => x !== e)
                                : undefined) as any,
                        }))
                    }
                    onAdd={() => null}
                />
            }
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => {
                        if (propId === "selectionMode") {
                            setProps((prev) => ({
                                ...prev,
                                selection: undefined,
                            }));
                        }
                        setProps((prev) => ({ ...prev, [propId]: value }));
                    }}
                />
            }
        />
    );
};

export default SelectionInputPage;
