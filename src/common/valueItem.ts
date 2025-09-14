export type ValueItemSimple<T extends string | number> = {
    label: string;
    description?: string;
    value: T;
};

export type ValueItemComplex<T> = {
    id: string;
    label: string;
    description?: string;
    value: T;
};

/**
 * If value cannot be used as a key, use ValueItemComplex.
 */
export type ValueItem<T = string> = T extends string | number
    ? ValueItemSimple<T>
    : ValueItemComplex<T>;
