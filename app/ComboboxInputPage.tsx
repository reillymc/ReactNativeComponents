import type { FunctionComponent } from "react";
import {
    ComboboxInput,
    type ComboboxInputProps,
} from "@reillymc/react-native-components/forms";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import {
    ContentPropDefinitions,
    FieldPropDefinitions,
    FieldTextInputPropDefinitions,
    InteractionPropDefinitions,
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
        id: "short1000",
        label: "1,000 simple items",
        value: createTestItems(1000, "short"),
    },
    {
        id: "described1000",
        label: "1,000 items with descriptions",
        value: createTestItems(1000, "described"),
    },
];

const propDefinitions: PropDefinitions<ComboboxInputProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "Combobox Input",
    },
    hideLabel: FieldPropDefinitions.hideLabel,
    help: FieldPropDefinitions.help,
    error: FieldPropDefinitions.error,
    required: FieldPropDefinitions.required,
    variant: FieldPropDefinitions.variant,
    disabled: FieldPropDefinitions.disabled,
    readOnly: FieldPropDefinitions.readOnly,
    clearButtonMode: FieldTextInputPropDefinitions.clearButtonMode,
    placeholder: FieldTextInputPropDefinitions.placeholder,
    items: enumPropDefinition({
        label: "Test items",
        default: "default",
        values: testItemSets,
    }),
    onChange: InteractionPropDefinitions.onChange,
    submitOnEnter: {
        type: "boolean",
        label: "Always submit on enter",
        default: false,
    },
    selectBehavior: enumPropDefinition({
        label: "Select behavior",
        default: "blurAndClose",
        values: [
            { label: "Blur and close", value: "blurAndClose" },
            { label: "Close", value: "close" },
            { label: "Keep open", value: "keepOpen" },
        ],
    }),
    disableOpenOnFocus: {
        type: "boolean",
        label: "Disable open on focus",
        default: false,
    },
    allowsCustomValue: {
        type: "boolean",
        label: "Allow custom value",
        default: false,
    },
    menuMount: enumPropDefinition({
        label: "Menu mount",
        default: "overlay",
        values: [
            { label: "Overlay", value: "overlay" },
            { label: "Inline", value: "inline" },
        ],
    }),
};

const ComboboxInputPage: FunctionComponent = () => {
    const { props, setProps, onChange } = useComponentProps(propDefinitions);

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
                    onChange={onChange}
                />
            }
        />
    );
};

export default ComboboxInputPage;
