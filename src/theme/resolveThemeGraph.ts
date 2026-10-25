import type { DeepPartial } from "@reillymc/es-utils";

import { mergeTheme } from "./mergeTheme";
import type { Palette } from "./palette";

export type ThemeFactoryContext<
    ThemeShape,
    K extends keyof ThemeShape,
    FactoryContext extends object = object,
> = {
    palette: Palette;
    theme: Readonly<Omit<ThemeShape, K>>;
} & FactoryContext;

export type ThemeFactoryFor<
    ThemeShape,
    K extends keyof ThemeShape,
    FactoryContext extends object = object,
> = (
    context: ThemeFactoryContext<ThemeShape, K, FactoryContext>,
) => ThemeShape[K];

export type ThemeDefinitionsFor<
    ThemeShape,
    FactoryContext extends object = object,
> = {
    [K in keyof ThemeShape]: ThemeFactoryFor<ThemeShape, K, FactoryContext>;
};

/**
 * Resolves a theme dependency graph. Dependencies are resolved on demand
 * during the pass and cached, then every theme node is materialized before
 * returning.
 */
export const resolveThemeGraph = <
    ThemeShape extends object,
    FactoryContext extends object = object,
>({
    definitions,
    palette,
    overrides,
    context = {} as FactoryContext,
    validateOverrides,
}: {
    definitions: ThemeDefinitionsFor<ThemeShape, FactoryContext>;
    palette: Palette;
    overrides?: DeepPartial<ThemeShape>;
    context?: FactoryContext;
    validateOverrides?: (overrides?: DeepPartial<ThemeShape>) => void;
}): ThemeShape => {
    validateOverrides?.(overrides);

    const keys = Object.keys(definitions) as unknown as ReadonlyArray<
        keyof ThemeShape
    >;
    const cache = new Map<keyof ThemeShape, unknown>();
    const stack: Array<keyof ThemeShape> = [];

    function resolveKey<K extends keyof ThemeShape>(key: K): ThemeShape[K] {
        if (cache.has(key)) {
            return cache.get(key) as ThemeShape[K];
        }

        const cycleStart = stack.indexOf(key);
        if (cycleStart !== -1) {
            const cycle = [...stack.slice(cycleStart), key].join(" -> ");
            throw new Error(`Theme dependency cycle: ${cycle}`);
        }

        stack.push(key);

        try {
            const factory = definitions[key] as ThemeFactoryFor<
                ThemeShape,
                K,
                FactoryContext
            >;
            const defaults = factory({
                palette,
                theme: reader as Readonly<Omit<ThemeShape, K>>,
                ...context,
            });
            const override = (
                overrides as
                    | Record<keyof ThemeShape, DeepPartial<ThemeShape[K]>>
                    | undefined
            )?.[key];
            const resolved = mergeTheme(defaults, override) as ThemeShape[K];

            cache.set(key, resolved);
            return resolved;
        } finally {
            stack.pop();
        }
    }

    const reader = Object.create(null) as ThemeShape;

    for (const key of keys) {
        Object.defineProperty(reader, key, {
            enumerable: false,
            configurable: false,
            get: () => resolveKey(key),
        });
    }

    return Object.fromEntries(
        keys.map((key) => [key, resolveKey(key)]),
    ) as ThemeShape;
};
