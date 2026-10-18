import { use } from "react";

import { ThemeContext, type ThemeContextDefinition } from "../providers";

/**
 * Reads the active theme. Pass a consumer extension type to see any custom
 * tokens that were provided to `ThemeProvider` (e.g. `useTheme<AppTheme>()`).
 */
export function useTheme<
    E extends object = Record<never, never>,
>(): ThemeContextDefinition<E> {
    return use(ThemeContext) as unknown as ThemeContextDefinition<E>;
}
