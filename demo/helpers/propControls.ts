import type {
    InputBaseProps,
    InputScaffoldProps,
} from "@reillymc/react-native-components/components";

import type { PropDefinitions } from "../components";

export const InputBasePropDefinitions = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    variant: {
        type: "enum",
        label: "Variant",
        values: [
            { label: "Regular", value: "regular" },
            { label: "Compact", value: "compact" },
        ],
    },
} as const satisfies PropDefinitions<InputBaseProps>;

export const InputScaffoldPropDefinitions = {
    mandatory: {
        type: "boolean",
        label: "Mandatory",
    },
    label: {
        type: "enum",
        label: "Label",
        default: "None",
        values: [
            { id: "None", label: "None", value: undefined },
            { id: "Text", label: "Text", value: "Example label" },
            {
                id: "Component",
                label: "Component (unavailable)",
                value: undefined,
            },
        ],
    },
    helpText: {
        type: "string",
        label: "Help text",
    },
} as const satisfies PropDefinitions<Omit<InputScaffoldProps, "children">>;

export const CommonInputProps = {
    ...InputBasePropDefinitions,
    ...InputScaffoldPropDefinitions,
};
