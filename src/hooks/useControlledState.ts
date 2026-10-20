import { useState } from "react";

/**
 * Splits a value into controlled (prop-driven) or uncontrolled (internal)
 * state. `isControlled` is determined by the caller (e.g. whether the prop key
 * was supplied) so that clearing back to `undefined` keeps working in
 * controlled mode.
 */
export const useControlledState = <T>(
    isControlled: boolean,
    value: T | undefined,
    defaultValue: T | undefined,
) => {
    const [internalValue, setInternalValue] = useState<T | undefined>(
        defaultValue,
    );

    const currentValue = isControlled ? value : internalValue;

    const setValue = (nextValue: T | undefined) => {
        if (!isControlled) {
            setInternalValue(nextValue);
        }
    };

    return [currentValue, setValue] as const;
};
