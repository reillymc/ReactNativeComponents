import type { FC } from "react";

import { InputBase, type InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";

export type TextInputStyles = {};

export interface TextInputProps
    extends InputBaseProps,
        Pick<
            InputScaffoldProps,
            "label" | "helpText" | "mandatory" | "hasError"
        > {}

export const TextInput: FC<TextInputProps> = ({
    label,
    helpText,
    mandatory,
    hasError,
    ...props
}) => (
    <InputScaffold
        label={label}
        helpText={helpText}
        mandatory={mandatory}
        hasError={hasError}
    >
        <InputBase {...props} />
    </InputScaffold>
);
