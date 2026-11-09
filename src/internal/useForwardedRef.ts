import { type Ref, type RefObject, useImperativeHandle, useRef } from "react";

export const useForwardedRef = <T>(
    ref: Ref<T> | undefined | null,
): RefObject<T | null> => {
    const inputRef = useRef<T>(null);

    useImperativeHandle<T | null, T | null>(ref, () => inputRef.current);

    return inputRef;
};
