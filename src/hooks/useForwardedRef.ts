import React from "react";

export const useForwardedRef = <T>(ref: React.ForwardedRef<T>) => {
    const localRef = React.useRef<T>(null);

    React.useEffect(() => {
        if (!ref) {
            return;
        }

        if (typeof ref === "function") {
            ref(localRef.current);
        } else {
            ref.current = localRef.current;
        }
    });

    return localRef;
};
