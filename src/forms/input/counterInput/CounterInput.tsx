import type { FC } from "react";

import type { ComponentIconAssets } from "../../../icons/componentIconAssets";
import {
    Field,
    type FieldComponentProps,
    type FieldNumberInputProps,
} from "../../field";
import { CounterControl } from "./CounterControl";

export type CounterInputIcons = ComponentIconAssets<"decrease" | "increase">;

export type CounterInputProps = FieldComponentProps &
    Pick<
        FieldNumberInputProps,
        "placeholder" | "maxLength" | "onSubmitEditing" | "keyboardType"
    > & {
        value?: string;
        onChange?: (value: string) => void;
        disableKeyboardInput?: boolean;
        interval?: number;
        min?: number;
        max?: number;
    };

/**
 * Numeric input with increment and decrement actions.
 *
 * ArrowUp/ArrowDown and the actions step by `interval` within `min` and `max`.
 */
export const CounterInput: FC<CounterInputProps> = ({
    value = "",
    onChange,
    disableKeyboardInput,
    interval = 1,
    min = 0,
    max = Number.MAX_VALUE,
    keyboardType = "number-pad",
    placeholder,
    maxLength,
    disabled,
    readOnly,
    onSubmitEditing,
    ...fieldProps
}) => (
    <Field disabled={disabled} readOnly={readOnly} {...fieldProps}>
        <CounterControl
            value={value}
            onChange={onChange}
            disableKeyboardInput={disableKeyboardInput}
            interval={interval}
            min={min}
            max={max}
            keyboardType={keyboardType}
            placeholder={placeholder}
            maxLength={maxLength}
            onSubmitEditing={onSubmitEditing}
        />
    </Field>
);
