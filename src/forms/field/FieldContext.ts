import { createContext, useContext } from "react";

import type { InputVariant } from "./Field.theme";

export type FieldControlRegistration = {
    focus: () => void;
};

export type FieldContextValue = {
    labelId?: string;
    label: string;
    describedBy?: string;
    hint?: string;
    disabled: boolean;
    readOnly: boolean;
    required: boolean;
    invalid: boolean;
    variant: InputVariant;
    registerControl: (registration: FieldControlRegistration) => () => void;
    focusFirstControl: () => void;
};

/**
 * Field state and control registry shared with descendant field controls.
 */
export const FieldContext = createContext<FieldContextValue | null>(null);

export const useFieldContext = () => useContext(FieldContext);

export const useFieldControlState = () => {
    const field = useFieldContext();

    return {
        field,
        label: field?.label,
        disabled: field?.disabled ?? false,
        readOnly: field?.readOnly ?? false,
        invalid: field?.invalid ?? false,
        required: field?.required ?? false,
        interactive: !(field?.disabled || field?.readOnly),
        variant: field?.variant ?? "regular",
    };
};
