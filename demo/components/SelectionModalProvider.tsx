import { type FC, type ReactNode, useCallback, useMemo, useState } from "react";

import {
    SelectionModalContext,
    type SelectionRequest,
} from "./SelectionModalContext";

export const SelectionModalProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [request, setRequest] = useState<SelectionRequest>();

    const open = useCallback((next: SelectionRequest) => {
        setRequest(next);
    }, []);

    const dismiss = useCallback(() => {
        setRequest(undefined);
    }, []);

    const value = useMemo(
        () => ({ request, open, dismiss }),
        [request, open, dismiss],
    );

    return (
        <SelectionModalContext.Provider value={value}>
            {children}
        </SelectionModalContext.Provider>
    );
};
