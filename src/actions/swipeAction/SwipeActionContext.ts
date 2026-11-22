import { createContext } from "react";

interface SwipeActionContextValue {
    /** Container-supplied close callback, invoked after onPress. */
    onActionActivated?: () => void;
}

export const SwipeActionContext = createContext<SwipeActionContextValue>({});
