import type {
    AccessibilityState,
    AccessibilityValue,
    TextInputProps,
    ViewProps,
} from "react-native";

type FieldAriaSource = {
    labelId?: string;
    label?: string;
    describedBy?: string;
    hint?: string;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    readOnly?: boolean;
} | null;

type FieldLabelOverrides = {
    label?: string;
};

type FieldAriaOverrides = FieldLabelOverrides & {
    hint?: string;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    readOnly?: boolean;
    state?: AccessibilityState;
    value?: AccessibilityValue;
};

/**
 * Builds the field accessible name and label association. `FieldRow` uses this
 * without `fieldAria`, so the group does not inherit invalid/required/
 * described-by state from its controls.
 */
export const fieldLabelA11y = (
    field: FieldAriaSource,
    overrides: FieldLabelOverrides = {},
): Pick<ViewProps, "accessibilityLabel" | "aria-labelledby"> => ({
    accessibilityLabel: overrides.label ?? field?.label,
    "aria-labelledby": field?.labelId,
});

/**
 * Single field-level accessibility prop builder for controls.
 *
 * Owns the accessible name, hint, label/description references, disabled/
 * invalid/required/read-only state, and merged `accessibilityState`. Pass
 * control-specific state and value through `state` and `value`; control
 * semantics such as `role` and accessibility actions stay at the call site.
 * This is the only cast site for props RN 0.85 does not type.
 */
export const fieldAria = (
    field: FieldAriaSource,
    overrides: FieldAriaOverrides = {},
): ViewProps & TextInputProps => {
    const disabled = overrides.disabled ?? field?.disabled ?? false;
    const invalid = overrides.invalid ?? field?.invalid ?? false;
    const required = overrides.required ?? field?.required ?? false;
    const readOnly = overrides.readOnly ?? field?.readOnly ?? false;
    const state = overrides.state;
    const value = overrides.value;

    return {
        ...fieldLabelA11y(field, overrides),
        "aria-describedby": field?.describedBy,
        "aria-disabled": disabled || undefined,
        "aria-invalid": invalid || undefined,
        "aria-readonly": readOnly || undefined,
        "aria-required": required || undefined,
        accessibilityHint: overrides.hint ?? field?.hint,
        accessibilityState: { ...state, disabled },
        accessibilityValue: value,
        "aria-checked": state?.checked,
        "aria-expanded": state?.expanded,
        "aria-selected": state?.selected,
        "aria-busy": state?.busy,
        "aria-valuemax": value?.max,
        "aria-valuemin": value?.min,
        "aria-valuenow": value?.now,
        "aria-valuetext": value?.text,
    } as ViewProps & TextInputProps;
};
