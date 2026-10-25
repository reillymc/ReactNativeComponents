import { type RefObject, useRef } from "react";

export const useForwardedRef = <T>(ref: RefObject<T> | undefined | null) => {
    const localRef = useRef<T>(null);

    return ref ?? localRef;
};
