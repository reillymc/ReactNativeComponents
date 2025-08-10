import type { FC } from "react";

import { InputBase, type InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";

export type TextInputStyles = never;

export interface TextInputProps
    extends InputBaseProps,
        Pick<
            InputScaffoldProps,
            "label" | "helpText" | "mandatory" | "hasError" | "containerStyle"
        > {}

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
