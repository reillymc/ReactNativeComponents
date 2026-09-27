import {
    DropdownInputBase,
    type DropdownInputBaseProps,
} from "./DropdownInputBase";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";

export interface DropdownInputStyles {
    panelGap: number;
}

export type DropdownInputProps<T = string> = Pick<
    DropdownInputBaseProps<T>,
    | "autoCapitalize"
    | "returnKeyType"
    | "returnKeyLabel"
    | "onBlur"
    | "placeholder"
    | "onChangeText"
    | "textValue"
    | "clearButtonMode"
    | "maxLength"
    | "onSubmitEditing"
    | "autoFocus"
    | "submitBehavior"
    | "disabled"
    | "variant"
    | "items"
    | "selectedValue"
    | "minimumSearchLength"
    | "maxSuggestionCount"
    | "panelPosition"
    | "onSelect"
    | "ref"
    | "selectBehaviour"
> &
    InputScaffoldFieldProps;
export const DropdownInput = <T,>({
    label,
    helpText,
    hasError,
    mandatory,
    containerStyle,
    ...props
}: DropdownInputProps<T>) => (
    <InputScaffold
        label={label}
        helpText={helpText}
        mandatory={mandatory}
        hasError={hasError}
        containerStyle={containerStyle}
    >
        <DropdownInputBase {...props} />
    </InputScaffold>
);
