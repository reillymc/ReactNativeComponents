import type { FieldTextInputProps } from "@reillymc/react-native-components/forms";

import type { PropDefinitions } from "../components";

type DemoFieldProps = {
    label?: string;
    hideLabel?: boolean;
    help?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    variant?: "regular" | "compact";
};

export const FieldTextInputPropDefinitions = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
} as const satisfies PropDefinitions<FieldTextInputProps>;

export const FieldPropDefinitions = {
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    readOnly: {
        type: "boolean",
        label: "Read only",
    },
    variant: {
        type: "enum",
        label: "Variant",
        values: [
            { label: "Regular", value: "regular" },
            { label: "Compact", value: "compact" },
        ],
    },
    required: {
        type: "boolean",
        label: "Required",
    },
    label: {
        type: "enum",
        label: "Label",
        default: "None",
        values: [
            { id: "none", label: "None", value: undefined },
            { label: "Text", value: "Example label" },
        ],
    },
    hideLabel: {
        type: "boolean",
        label: "Hide label",
    },
    help: {
        type: "string",
        label: "Help text",
    },
    error: {
        type: "string",
        label: "Error text",
    },
} as const satisfies PropDefinitions<DemoFieldProps>;
