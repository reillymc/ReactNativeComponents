import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../../icons/componentIconAssets";
import type { IconComponentProps } from "../../../icons/IconComponentProps";
import { Field, type FieldComponentProps } from "../../field";
import { ToggleControl } from "./ToggleControl";
import type { ToggleAppearance, ToggleInputTheme } from "./ToggleInput.theme";

export type ToggleInputIcons = ComponentIconAssets<
    "outline" | "fill" | "check"
>;

export type ToggleInputProps<G extends string> = Omit<
    FieldComponentProps,
    "error" | "required" | "hideLabel"
> & {
    value?: boolean;
    onChange?: (value: boolean) => void;
    appearance?: ToggleAppearance;
    theme?: DeepPartial<ToggleInputTheme>;
} & Partial<IconComponentProps<G>>;

/**
 * Toggle field with an inline label.
 *
 * Selected toggles show the provided icon, or a built-in check when omitted.
 */
export const ToggleInput = <G extends string>({
    label,
    value = false,
    onChange,
    appearance = "primary",
    theme: themeOverrides,
    iconSet,
    iconName,
    ...fieldProps
}: ToggleInputProps<G>) => {
    return (
        <Field {...fieldProps} label={label} hideLabel>
            <ToggleControl
                label={label}
                value={value}
                onChange={onChange}
                appearance={appearance}
                themeOverrides={themeOverrides}
                iconSet={iconSet}
                iconName={iconName}
            />
        </Field>
    );
};
