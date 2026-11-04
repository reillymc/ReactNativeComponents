import type { DeepPartial } from "@reillymc/es-utils";

import type { ToggleAppearance } from "../../../display/toggleIndicator";
import type { IconComponentProps } from "../../../icons/IconComponentProps";
import { useComponent } from "../../../internal";
import { Field, type FieldComponentProps } from "../../field";
import { ToggleControl } from "./ToggleControl";
import type { ToggleInputTheme } from "./ToggleInput.theme";

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
    variant = "regular",
    theme: themeOverrides,
    iconSet,
    iconName,
    ...fieldProps
}: ToggleInputProps<G>) => {
    const { theme } = useComponent("toggleInput", { themeOverrides });
    const helpInset =
        label === undefined
            ? 0
            : theme.indicator.surfaceSize[variant] + theme.label.gap;

    return (
        <Field
            {...fieldProps}
            label={label}
            variant={variant}
            hideLabel
            theme={{ help: { inset: helpInset } }}
        >
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
