/** biome-ignore-all lint/suspicious/noExplicitAny: generic selection payloads need a permissive shared type */
import { createContext, useContext } from "react";
import type { ValueItem } from "@reillymc/react-native-components/common";

export type SelectionRequest<T = any> = {
    key: string;
    items: ValueItem<T>[];
    selectionMode: "single" | "multi";
    selection: ValueItem<T>[];
    label: string;
    placeholder?: string;
    resolve: (selection: ValueItem<T>[]) => void;
};

export interface SelectionModalContextValue {
    request?: SelectionRequest;
    open: (request: SelectionRequest) => void;
    dismiss: () => void;
}

export const SelectionModalContext = createContext<
    SelectionModalContextValue | undefined
>(undefined);

export const useSelectionModalController = () => {
    const context = useContext(SelectionModalContext);
    if (!context) {
        throw new Error(
            "useSelectionModalController must be used within a SelectionModalProvider",
        );
    }
    return context;
};
