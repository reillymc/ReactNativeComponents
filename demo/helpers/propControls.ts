import type { OcticonsIconName } from "@react-native-vector-icons/octicons";
import type { FieldTextInputProps } from "@reillymc/react-native-components/forms";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";
import type { SizeVariant } from "@reillymc/react-native-components/theme";

import type { PropDefinitions } from "../components";
import { glyphMapValueItems } from "./glyphMapValueItems";

type DemoFieldProps = {
    label?: string;
    hideLabel?: boolean;
    help?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    variant?: SizeVariant;
};

type DemoIconProps = IconComponentProps<OcticonsIconName>;

type DemoSizeVariantProps = {
    variant: SizeVariant;
};

export const FieldTextInputPropDefinitions = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
    },
    clearButtonMode: {
        type: "enum",
        label: "Clear button mode",
        default: "Never",
        values: [
            { label: "Never", value: "never" },
            { label: "While editing", value: "while-editing" },
            { label: "Unless editing", value: "unless-editing" },
            { label: "Always", value: "always" },
        ],
    },
} as const satisfies PropDefinitions<FieldTextInputProps>;

export const SizeVariantPropDefinitions = {
    variant: {
        type: "enum",
        label: "Size",
        default: "Regular",
        values: [
            { label: "Regular", value: "regular" },
            { label: "Compact", value: "compact" },
        ],
    },
} as const satisfies PropDefinitions<DemoSizeVariantProps>;

export const IconPropDefinitions = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItems,
    },
    iconSet: {
        type: "hidden",
    },
} as const satisfies PropDefinitions<DemoIconProps>;

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
        ...SizeVariantPropDefinitions.variant,
        label: "Variant",
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
