import { InlineSelectionInput, InlineSelectionInputProps } from "@reillymc/react-native-components";
import React from "react";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<InlineSelectionInputProps> = {
    label: {
        label: "Label",
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
    variant: {
        type: "enum",
        label: "Variant",
        default: "light",
        values: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
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

const defaultProps: InlineSelectionInputProps = {
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
    selectionMode: "single",
    variant: "light",
    width: "large",
    onRemoveItem: () => null,
};

const InlineSelectionInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<InlineSelectionInputProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Inline Selection Input"
            component={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <InlineSelectionInput
                    {...props}
                    onRemoveItem={(e: any) =>
                        setProps(prev => ({
                            ...prev,
                            selection: (Array.isArray(prev.selection)
                                ? prev.selection.filter(x => x != e)
                                : undefined) as any,
                        }))
                    }
                />
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

export default InlineSelectionInputPage;
