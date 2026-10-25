import { defaultPalette, type Palette } from "./palette";
import { resolveThemeGraph } from "./resolveThemeGraph";
import type { Theme, ThemeOverrides } from "./theme";
import { definitions } from "./themeDefinitions";

const validateOverrides = (overrides?: ThemeOverrides) => {
    if (!overrides || typeof __DEV__ === "undefined" || !__DEV__) return;

    for (const key of Object.keys(overrides)) {
        if (!Object.hasOwn(definitions, key)) {
            throw new Error(`Unknown theme override key: ${key}`);
        }
    }
};

/**
 * Resolves the component theme graph. Dependencies are resolved on demand
 * during the pass and cached, then every theme node is materialized before
 * returning. Provider overrides are merged before a node is cached so
 * dependents observe overridden base values.
 *
 * The dependency reader exposes non-enumerable getters. Theme factories must
 * access dependencies as properties rather than spreading or enumerating it.
 */
export const resolveTheme = (
    palette: Palette = defaultPalette,
    overrides?: ThemeOverrides,
): Theme =>
    resolveThemeGraph<Theme>({
        definitions,
        palette,
        overrides,
        validateOverrides,
    });
