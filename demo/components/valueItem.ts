import type { ValueItem } from "@reillymc/react-native-components/forms";

export type ValueItemKey<T> = T extends string | number ? T : string;

export const getValueItemKey = <T>(item: ValueItem<T>): ValueItemKey<T> =>
    ("id" in item ? item.id : item.value) as ValueItemKey<T>;
