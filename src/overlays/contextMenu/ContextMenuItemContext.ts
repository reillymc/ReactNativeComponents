import { createContext } from "react";

interface ContextMenuItemContextValue {
    active: boolean;
    onActionActivated?: () => void;
}

export const ContextMenuItemContext =
    createContext<ContextMenuItemContextValue>({
        active: false,
    });
