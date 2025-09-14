import React, { type RefObject } from "react";

export const useForwardedRef = <T>(ref: RefObject<T> | undefined | null) => {
    const localRef = React.useRef<T>(null);

    return ref ?? localRef;
};
