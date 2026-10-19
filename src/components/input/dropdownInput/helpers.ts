import type { ValueItem } from "../../../common";

export type DropdownValue<T> = T extends string | number ? T : string;

export const getItemKey = <T>(item: ValueItem<T>): DropdownValue<T> =>
    ("id" in item ? item.id : item.value) as DropdownValue<T>;

export type DropdownFilterOptions<T> = {
    filterItems?: (item: ValueItem<T>, query: string) => boolean;
    maxSuggestionCount?: number;
    minimumSearchLength?: number;
};

export const filterDropdownItems = <T>(
    items: Array<ValueItem<T>>,
    query: string,
    {
        filterItems,
        maxSuggestionCount,
        minimumSearchLength = 1,
    }: DropdownFilterOptions<T>,
) => {
    const search = query.toLowerCase();
    const filteredItems: Array<ValueItem<T>> = [];

    for (const item of items) {
        if (
            maxSuggestionCount !== undefined &&
            filteredItems.length >= maxSuggestionCount
        ) {
            break;
        }

        if (!search) {
            filteredItems.push(item);
            continue;
        }

        const matches = filterItems
            ? filterItems(item, query)
            : item.label.toLowerCase().includes(search) ||
              !!item.description?.toLowerCase().includes(search);

        if (matches) {
            filteredItems.push(item);
        }
    }

    return {
        filteredItems,
        meetsMinimum:
            search.length === 0 || search.length >= minimumSearchLength,
    };
};
