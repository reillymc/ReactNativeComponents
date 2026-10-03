import { useCallback } from "react";
import { useRouter } from "expo-router";
import type { ValueItem } from "@reillymc/react-native-components/common";

import { useSelectionModalController } from "./SelectionModalContext";

type OpenSelectionModalParams<T> = {
    key: string;
    items: ValueItem<T>[];
    selectionMode: "single" | "multi";
    label: string;
    placeholder?: string;
    selection?: ValueItem<T>[];
    onSelect?: (selection: ValueItem<T>[]) => void;
};

export const useSelectionModal = () => {
    const router = useRouter();
    const { open } = useSelectionModalController();

    const openSelectionModal = useCallback(
        <T>({
            key,
            items,
            selectionMode,
            label,
            placeholder,
            selection,
            onSelect,
        }: OpenSelectionModalParams<T>) => {
            open({
                key,
                items,
                selectionMode,
                label,
                placeholder,
                selection: selection ?? [],
                resolve: (value) => onSelect?.(value as ValueItem<T>[]),
            });
            router.push("/SelectionModal");
        },
        [open, router],
    );

    return { openSelectionModal };
};
