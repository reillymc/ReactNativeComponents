import { createContext, useContext, useEffect, useState } from "react";

export type FieldSurfaceContextValue = {
    reportFocus: (id: symbol, focusVisible: boolean) => void;
};

/**
 * Focus-reporting channel used by nested slots to drive the
 * surface focus ring.
 */
export const FieldSurfaceContext =
    createContext<FieldSurfaceContextValue | null>(null);

/**
 * Reports focus-visible state for one focusable slot to the enclosing
 * FieldSurface, which keeps its shared ring visible while any slot is focused.
 */
export const useFieldFocus = () => {
    const surface = useContext(FieldSurfaceContext);
    const [id] = useState(() => Symbol("fieldSlot"));
    const reportFocus = surface?.reportFocus;

    useEffect(() => {
        if (!reportFocus) return;

        return () => reportFocus(id, false);
    }, [id, reportFocus]);

    const reportFocusVisible = (focusVisible: boolean) =>
        reportFocus?.(id, focusVisible);

    return {
        isNestedInSurface: reportFocus !== undefined,
        reportFocusVisible: reportFocus ? reportFocusVisible : undefined,
    };
};
