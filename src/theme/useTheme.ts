import { use } from "react";

import type { Palette } from "./palette";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";
import type { Theme } from "./theme";

export const useThemeContext = (): ThemeContextValue => use(ThemeContext);

/**
 * Reads base design tokens.
 */
export const usePalette = (): Palette => use(ThemeContext).palette;

/**
 * Reads the active component theme registry.
 */
export const useComponentThemes = (): Theme => use(ThemeContext).theme;
