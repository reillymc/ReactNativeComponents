import { InputScaffold, type InputScaffoldFieldProps } from "../InputScaffold";
import {
    ComboboxInputBase,
    type ComboboxInputBaseProps,
} from "./ComboboxInputBase";

export interface ComboboxInputTheme {
    panelGap: number;
}

export type ComboboxInputProps<T = string> = Pick<
    ComboboxInputBaseProps<T>,
    | "autoCapitalize"
    | "returnKeyType"
    | "returnKeyLabel"
    | "onBlur"
    | "placeholder"
    | "onChangeText"
    | "controllerRef"
    | "clearButtonMode"
    | "maxLength"
    | "onSubmitEditing"
    | "autoFocus"
    | "disabled"
    | "variant"
    | "items"
    | "value"
    | "defaultValue"
    | "onChange"
    | "openOnFocus"
    | "allowsCustomValue"
    | "blurOnSelect"
    | "filterItems"
    | "minimumSearchLength"
    | "maxSuggestionCount"
    | "containerPosition"
    | "ref"
> &
    InputScaffoldFieldProps;
export const ComboboxInput = <T,>({
    label,
    helpText,
    hasError,
    mandatory,
    containerStyle,
    ...props
}: ComboboxInputProps<T>) => (
    <InputScaffold
        label={label}
        helpText={helpText}
        mandatory={mandatory}
        hasError={hasError}
        containerStyle={containerStyle}
    >
        <ComboboxInputBase {...props} />
    </InputScaffold>
);
