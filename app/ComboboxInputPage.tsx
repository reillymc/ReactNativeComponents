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
    onChange: {
        type: "function",
        label: "onChange",
    },
    openOnFocus: {
        type: "boolean",
        label: "Open on focus",
    },
    allowsCustomValue: {
        type: "boolean",
        label: "Allow custom value",
    },
    blurOnSelect: {
        type: "boolean",
        label: "Blur on select",
    },
};

const defaultProps: ComboboxInputProps = {
    placeholder: "Combobox Input",
    items: [
        { value: "1", label: "Item 1" },
        {
            value: "2",
            label: "Item 2",
            description: "An item with description",
        },
        { value: "3", label: "Item 3" },
        { value: "4", label: "Item 4" },
        { value: "5", label: "Item 5" },
        { value: "6", label: "Item 6" },
        { value: "s1", label: "Something Else 1" },
        { value: "s2", label: "Something Else 2" },
        { value: "s3", label: "Something Else 3" },
    ],
    openOnFocus: true,
    allowsCustomValue: false,
    blurOnSelect: true,
};

const ComboboxInputPage: FunctionComponent = () => {
    const [props, setProps] = useState(defaultProps);

    return (
        <ComponentPage
            componentName="Combobox Input"
            component={
                <ComboboxInput
                    {...props}
                    onChange={(item) =>
                        setProps((prev) => ({
                            ...prev,
                            value: item?.value,
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
