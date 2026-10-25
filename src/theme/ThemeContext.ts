import { createContext } from "react";

import { defaultIcons, type Icons } from "./icons";
import { defaultPalette, type Palette } from "./palette";
import { resolveTheme } from "./resolveTheme";
import type { Theme } from "./theme";

export interface ThemeContextValue {
    palette: Palette;
    theme: Theme;
    icons: Icons;
}

const defaultTheme = resolveTheme(defaultPalette);

export const ThemeContext = createContext<ThemeContextValue>({
    palette: defaultPalette,
    theme: defaultTheme,
    icons: defaultIcons,
});
