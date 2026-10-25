import { use } from "react";

import type { Palette } from "./palette";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";

export const useThemeContext = (): ThemeContextValue => use(ThemeContext);

/**
 * Reads base design tokens.
 */
export const usePalette = (): Palette => use(ThemeContext).palette;
