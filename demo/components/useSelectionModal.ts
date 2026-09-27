/** biome-ignore-all lint/correctness/useExhaustiveDependencies: TODO: some specific behaviour is required, revisit later to fix */
import { useCallback, useEffect, useMemo } from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import type {
    SelectionInputProps,
    ValueItem,
} from "@reillymc/react-native-components";

type UseSelectionModalParams<T> = Pick<
    SelectionInputProps<T>,
    "selectionMode" | "items"
> & {
    key: string;
    label: string;
    placeholder?: string;
    initialSelection?: ValueItem<T>[];
};

export const useSelectionModal = <T>({
    key,
    initialSelection,
    label,
    items,
    placeholder,
    selectionMode,
}: UseSelectionModalParams<T>) => {
    const router = useRouter();

    const { key: _, selection: selectionParam } = useGlobalSearchParams();

    // TODO: investigate issues with params not updating when expected
    const isActive = true; //useMemo(() => key === keyParam, [key, keyParam]);

    const selectedItemsFromParams = useMemo(() => {
        if (
            !(isActive && selectionParam) ||
            selectionParam === "undefined" ||
            Array.isArray(selectionParam)
        )
            return;

        return JSON.parse(selectionParam) as Array<ValueItem<T>>;
    }, [isActive, selectionParam]);

    const selectedWithInitial = useMemo(
        () => selectedItemsFromParams ?? initialSelection ?? [],
        [selectedItemsFromParams, initialSelection],
    );

    const stringItems = useMemo(() => JSON.stringify(items), [items]);
    const stringSelectedWithInitial = useMemo(
        () =>
            selectedWithInitial
                ? JSON.stringify(selectedWithInitial)
                : undefined,
        [selectedWithInitial],
    );

    useEffect(() => {
        if (!isActive) return;

        router.setParams({
            key,
            selectionMode: selectionMode,
            label,
            placeholder,
            items: stringItems,
            selection: stringSelectedWithInitial,
        });
    }, [
        isActive,
        stringItems,
        stringSelectedWithInitial,
        key,
        label,
        placeholder,
        router,
        selectionMode,
    ]);

    const openSelectionModal = useCallback(() => {
        router.push({
            pathname: "/SelectionModal",
            params: {
                key,
                selectionMode: selectionMode,
                label,
                placeholder,
                items: stringItems,
                selection: stringSelectedWithInitial,
            },
        });
    }, [
        stringItems,
        key,
        label,
        placeholder,
        stringSelectedWithInitial,
        router,
        selectionMode,
    ]);

    return {
        selectedItems: selectedWithInitial,
        openSelectionModal,
    };
};
