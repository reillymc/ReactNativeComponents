import { use } from "react";

import { ThemeContext, type ThemeContextDefinition } from "../providers";

/**
 * Reads the active theme. Pass a consumer style extension type to see any
 * app-owned style slices (e.g. `useTheme<AppStyles>()`).
 */
export function useTheme<
    E extends object = Record<never, never>,
>(): ThemeContextDefinition<E> {
    return use(ThemeContext) as unknown as ThemeContextDefinition<E>;
}
