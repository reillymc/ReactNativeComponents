import Octicons, {
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import type {
    ActionProps,
    ButtonProps,
} from "@reillymc/react-native-components/actions";
import type { ToggleAppearance } from "@reillymc/react-native-components/display";
import type { FieldTextInputProps } from "@reillymc/react-native-components/forms";
import type { IconComponentProps } from "@reillymc/react-native-components/icons";
import type { SizeVariant } from "@reillymc/react-native-components/theme";
import type { TextProps } from "@reillymc/react-native-components/typography";

import { enumPropDefinition, type PropDefinitions } from "../components";
import { glyphMapValueItems } from "./glyphMapValueItems";

// Content

type DemoContentProps = {
    label?: string;
};

export const ContentPropDefinitions = {
    label: {
        type: "string",
        label: "Label",
        default: undefined,
    },
} as const satisfies PropDefinitions<DemoContentProps>;

// Field scaffold

type DemoFieldProps = {
    hideLabel?: boolean;
    help?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    variant?: SizeVariant;
};

// Text input

export const FieldTextInputPropDefinitions = {
    placeholder: {
        type: "string",
        label: "Placeholder text",
        default: "Placeholder text",
    },
    clearButtonMode: enumPropDefinition({
        label: "Clear button mode",
        default: "never",
        values: [
            { label: "Never", value: "never" },
            { label: "While editing", value: "while-editing" },
            { label: "Unless editing", value: "unless-editing" },
            { label: "Always", value: "always" },
        ],
    }),
} as const satisfies PropDefinitions<FieldTextInputProps>;

// Icons

type DemoIconProps = IconComponentProps<OcticonsIconName>;

export const IconPropDefinitions = {
    iconName: enumPropDefinition({
        label: "Icon Name",
        default: "arrow-both",
        values: glyphMapValueItems,
    }),
    iconSet: {
        type: "hidden",
        default: Octicons,
    },
} as const satisfies PropDefinitions<DemoIconProps>;

// Interaction

type DemoInteractionProps = {
    disabled?: boolean;
    onPress?: () => void;
    onChange?: (...args: unknown[]) => void;
    hiddenOnChange?: () => void;
};

export const InteractionPropDefinitions = {
    disabled: {
        type: "boolean",
        label: "Disabled",
        default: false,
    },
    onPress: {
        type: "function",
        label: "Press action",
        default: () => null,
    },
    onChange: {
        type: "function",
        label: "onChange",
        default: undefined,
    },
    hiddenOnChange: {
        type: "hidden",
        default: () => null,
    },
} as const satisfies PropDefinitions<DemoInteractionProps>;

// Inputs

type DemoInputProps = {
    keyboardType?: "number-pad" | "decimal-pad";
};

export const InputPropDefinitions = {
    keyboardType: enumPropDefinition({
        label: "Keyboard Type",
        default: "number-pad",
        values: [
            { label: "Number", value: "number-pad" },
            { label: "Decimal", value: "decimal-pad" },
        ],
    }),
} as const satisfies PropDefinitions<DemoInputProps>;

// Rating

type DemoRatingProps = {
    value?: number;
    max?: number;
    scale?: number;
};

export const RatingPropDefinitions = {
    value: {
        type: "number",
        label: "Rating value",
        default: 0,
    },
    max: {
        type: "number",
        label: "Max Value",
        default: 5,
    },
    scale: {
        type: "number",
        label: "Scale",
        default: undefined,
    },
} as const satisfies PropDefinitions<DemoRatingProps>;

// Variants and appearance

type DemoVariantProps = {
    size?: SizeVariant;
    action?: NonNullable<ActionProps["variant"]>;
    button?: NonNullable<ButtonProps["variant"]>;
    buttonAppearance?: NonNullable<ButtonProps["appearance"]>;
    toggleAppearance?: ToggleAppearance;
    text?: NonNullable<TextProps["variant"]>;
};

export const VariantPropDefinitions = {
    size: enumPropDefinition({
        label: "Size",
        default: "regular",
        values: [
            { label: "Regular", value: "regular" },
            { label: "Compact", value: "compact" },
        ],
    }),
    action: enumPropDefinition({
        label: "Style variant",
        default: "secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Destructive", value: "destructive" },
        ],
    }),
    button: enumPropDefinition({
        label: "Style variant",
        default: "primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Destructive", value: "destructive" },
        ],
    }),
    buttonAppearance: enumPropDefinition({
        label: "Appearance",
        default: "subtle",
        values: [
            { label: "Prominent", value: "prominent" },
            { label: "Subtle", value: "subtle" },
        ],
    }),
    toggleAppearance: enumPropDefinition({
        label: "Appearance",
        default: "primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    }),
    text: enumPropDefinition({
        label: "Style variant",
        default: "body",
        values: [
            { label: "Display", value: "display" },
            { label: "Title", value: "title" },
            { label: "Heading", value: "heading" },
            { label: "Label", value: "label" },
            { label: "Body", value: "body" },
            { label: "Caption", value: "caption" },
        ],
    }),
} as const satisfies PropDefinitions<DemoVariantProps>;

// Field scaffold

export const FieldPropDefinitions = {
    disabled: InteractionPropDefinitions.disabled,
    readOnly: {
        type: "boolean",
        label: "Read only",
        default: false,
    },
    variant: {
        ...VariantPropDefinitions.size,
        label: "Variant",
    },
    required: {
        type: "boolean",
        label: "Required",
        default: false,
    },
    hideLabel: {
        type: "boolean",
        label: "Hide label",
        default: false,
    },
    help: {
        type: "string",
        label: "Help text",
        default: undefined,
    },
    error: {
        type: "string",
        label: "Error text",
        default: undefined,
    },
} as const satisfies PropDefinitions<DemoFieldProps>;
