import React, { type FC } from "react";

import { BaseInput, BaseInputProps } from "./BaseInput";

export interface TextInputStyles {}

export interface TextInputProps extends BaseInputProps {}

export const TextInput: FC<TextInputProps> = ({ ref, ...props }) => <BaseInput ref={ref} {...props} />;
