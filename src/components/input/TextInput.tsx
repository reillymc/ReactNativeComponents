import type { FC } from "react";

import { InputBase, type InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";

export type TextInputStyles = never;

export interface TextInputProps
    extends InputBaseProps,
        InputScaffoldFieldProps {}

export const TextInput: FC<TextInputProps> = ({
    label,
    helpText,
    mandatory,
    hasError,
    containerStyle,
    ...props
}) => (
    <InputScaffold
        label={label}
        helpText={helpText}
        mandatory={mandatory}
        hasError={hasError}
        containerStyle={containerStyle}
    >
        <InputBase {...props} />
    </InputScaffold>
);
