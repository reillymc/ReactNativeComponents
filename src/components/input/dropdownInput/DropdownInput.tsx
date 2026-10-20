import { InputScaffold, type InputScaffoldFieldProps } from "../InputScaffold";
import {
    DropdownInputBase,
    type DropdownInputBaseProps,
} from "./DropdownInputBase";

export type DropdownInputProps<T = string> = Pick<
    DropdownInputBaseProps<T>,
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
    | "maxContainerHeight"
    | "containerPosition"
    | "ref"
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
