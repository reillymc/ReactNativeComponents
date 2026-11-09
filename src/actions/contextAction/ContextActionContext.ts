import { createContext } from "react";

export interface ContextActionContextValue {
    /** Presentation to render. Defaults to "swipe". */
    layout?: "swipe" | "menu";
    /** Whether a menu action is the currently active/focused item. */
    active?: boolean;
    /** Container-supplied close callback, invoked after onPress. */
    onActionActivated?: () => void;
}

export const ContextActionContext = createContext<ContextActionContextValue>(
    {},
);
