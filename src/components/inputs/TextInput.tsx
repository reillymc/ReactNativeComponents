import React from "react";
import { TextInput as RNTextInput } from "react-native";

import { BaseInput, BaseInputProps } from "./BaseInput";

export interface TextInputStyles {}

export interface TextInputProps extends BaseInputProps {}

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>((props, ref) => {
    return <BaseInput ref={ref} {...props} />;
});

(TextInput as React.FunctionComponent).displayName = "TextInput";
