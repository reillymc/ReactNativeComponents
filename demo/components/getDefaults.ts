/** biome-ignore-all lint/suspicious/noExplicitAny: generic prop defaults helper */
import type { PropDefinitions } from "./PropsPanel";
import { getValueItemKey } from "./valueItem";

export const getDefaults = <T extends Record<string, any>>(
    propDefinitions: PropDefinitions<T>,
): T =>
    Object.fromEntries(
        Object.entries(propDefinitions).map(([key, definition]) => {
            if (definition.type === "enum") {
                const match = definition.values.find(
                    (item: any) => getValueItemKey(item) === definition.default,
                );

                if (!match) {
                    throw new Error(
                        `Enum prop "${key}" has default "${definition.default}" but no matching value.`,
                    );
                }

                return [key, match.value];
            }

            return [key, definition.default];
        }),
    ) as T;
