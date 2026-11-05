import { type FunctionComponent, useState } from "react";
import {
    ComboboxInput,
    type ComboboxInputProps,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import {
    FieldPropDefinitions,
    FieldTextInputPropDefinitions,
} from "../demo/helpers";

type ComboboxItem = NonNullable<ComboboxInputProps["items"]>[number];

const defaultItems: Array<ComboboxItem> = [
    { value: "1", label: "First Item" },
    { value: "2", label: "Second Item" },
    { value: "3", label: "Third Item" },
    { value: "4", label: "Fourth Entry" },
    { value: "5", label: "Fifth Entry" },
    { value: "6", label: "Sixth Entry" },
    { value: "7", label: "First Additional Item" },
    { value: "8", label: "Second Additional Item" },
    { value: "9", label: "First Additional Entry" },
];

const createTestItems = (
    count: number,
    variant: "short" | "described",
): Array<ComboboxItem> =>
    Array.from({ length: count }, (_, index) => {
        const value = String(index + 1);
        const number = value.padStart(4, "0");

        return {
            value,
            label: `Item ${number}`,
            description:
                variant === "described"
                    ? `Description for item ${number}`
                    : undefined,
        };
    });

const testItemSets = [
    {
        id: "default",
        label: "10 simple items",
        value: defaultItems,
    },
    {
        id: "short-1000",
        label: "1,000 simple items",
        value: createTestItems(1000, "short"),
    },
    {
        id: "described-1000",
        label: "1,000 items with descriptions",
        value: createTestItems(1000, "described"),
    },
];

const propDefinitions: PropDefinitions<ComboboxInputProps> = {
    label: FieldPropDefinitions.label,
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    placeholder: FieldTextInputPropDefinitions.placeholder,
    clearButtonMode: FieldTextInputPropDefinitions.clearButtonMode,
    items: {
        type: "enum",
        label: "Test items",
        default: "Default (10 items)",
        values: testItemSets,
    },
    onChange: {
        type: "function",
        label: "onChange",
    },
    submitOnEnter: {
        type: "boolean",
        label: "Always submit on enter",
    },
    selectBehavior: {
        type: "enum",
        label: "Select behavior",
        default: "Blur and close",
        values: [
            { label: "Blur and close", value: "blurAndClose" },
            { label: "Close", value: "close" },
            { label: "Keep open", value: "keepOpen" },
        ],
    },
    disableOpenOnFocus: {
        type: "boolean",
        label: "Disable open on focus",
    },
    allowsCustomValue: {
        type: "boolean",
        label: "Allow custom value",
    },
};

const defaultProps: ComboboxInputProps = {
    placeholder: "Combobox Input",
    items: defaultItems,
    submitOnEnter: false,
    selectBehavior: "blurAndClose",
    disableOpenOnFocus: false,
    allowsCustomValue: false,
};

const ComboboxInputPage: FunctionComponent = () => {
    const [props, setProps] = useState(defaultProps);

    return (
        <ComponentPage
            componentName="Combobox Input"
            component={
                <ComboboxInput
                    {...props}
                    onChange={({ value }) =>
                        setProps((prev) => ({
                            ...prev,
                            value,
                        }))
                    }
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

export default ComboboxInputPage;
