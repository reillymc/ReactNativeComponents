import type { DeepPartial } from "@reillymc/es-utils";

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    if (value === null || typeof value !== "object") return false;

    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

const cloneValue = <T>(value: T): T => {
    if (Array.isArray(value)) {
        return value.map((item) => cloneValue(item)) as T;
    }

    if (isPlainObject(value)) {
        const result: Record<string, unknown> = {};

        for (const key of Object.keys(value)) {
            if (UNSAFE_KEYS.has(key)) continue;
            result[key] = cloneValue(value[key]);
        }

        return result as T;
    }

    return value;
};

const mergeInto = (
    target: Record<string, unknown>,
    override: Record<string, unknown>,
) => {
    for (const key of Object.keys(override)) {
        if (UNSAFE_KEYS.has(key)) continue;

        const overrideValue = override[key];
        if (overrideValue === undefined) continue;

        const targetValue = target[key];

        if (Array.isArray(overrideValue)) {
            target[key] = overrideValue.map((item) => cloneValue(item));
        } else if (isPlainObject(targetValue) && isPlainObject(overrideValue)) {
            mergeInto(targetValue, overrideValue);
        } else {
            target[key] = cloneValue(overrideValue);
        }
    }
};

const mergeValue = (base: unknown, override: unknown): unknown => {
    if (override === undefined) return cloneValue(base);

    if (Array.isArray(override)) {
        return override.map((item) => cloneValue(item));
    }

    if (isPlainObject(base) && isPlainObject(override)) {
        const result = cloneValue(base) as Record<string, unknown>;
        mergeInto(result, override);
        return result;
    }

    return cloneValue(override);
};

/**
 * Deep-merges theme defaults with overrides.
 *
 * - plain objects merge recursively
 * - arrays replace
 * - undefined preserves defaults
 * - non-plain objects replace as leaves
 * - circular references are not supported
 */
export const mergeTheme = <T>(defaults: T, overrides?: DeepPartial<T>): T => {
    if (overrides === undefined) return cloneValue(defaults);
    return mergeValue(defaults, overrides) as T;
};
