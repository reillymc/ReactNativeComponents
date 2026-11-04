import { type FC, type ReactNode, useState } from "react";

import {
    SelectionModalContext,
    type SelectionRequest,
} from "./SelectionModalContext";

export const SelectionModalProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [request, setRequest] = useState<SelectionRequest>();

    const open = (next: SelectionRequest) => setRequest(next);

    const dismiss = () => setRequest(undefined);

    const value = { request, open, dismiss };

    return (
        <SelectionModalContext.Provider value={value}>
            {children}
        </SelectionModalContext.Provider>
    );
};
