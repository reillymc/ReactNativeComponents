/** biome-ignore-all lint/correctness/useExhaustiveDependencies: TODO: some specific behaviour is required, revisit later to fix */
import { useEffect } from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import type { ValueItem } from "@reillymc/react-native-components/common";
import type { SelectionInputProps } from "@reillymc/react-native-components/components";

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

    const selectedItemsFromParams =
        isActive &&
        selectionParam &&
        selectionParam !== "undefined" &&
        !Array.isArray(selectionParam)
            ? (JSON.parse(selectionParam) as Array<ValueItem<T>>)
            : undefined;

    const selectedWithInitial =
        selectedItemsFromParams ?? initialSelection ?? [];

    const stringItems = JSON.stringify(items);
    const stringSelectedWithInitial = selectedWithInitial
        ? JSON.stringify(selectedWithInitial)
        : undefined;

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

    const openSelectionModal = () => {
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
    };

    return {
        selectedItems: selectedWithInitial,
        openSelectionModal,
    };
};
