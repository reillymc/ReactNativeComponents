import { createContext } from "react";

import { defaultIcons, type Icons } from "./icons";
import { defaultPalette, type Palette } from "./palette";
import { resolveTheme } from "./resolveTheme";
import { createSystems, type Systems } from "./systems";
import type { Theme } from "./theme";

export interface ThemeContextValue {
    palette: Palette;
    theme: Theme;
    systems: Systems;
    icons: Icons;
}

const defaultTheme = resolveTheme(defaultPalette);
const defaultSystems = createSystems(defaultPalette);

export const ThemeContext = createContext<ThemeContextValue>({
    palette: defaultPalette,
    theme: defaultTheme,
    systems: defaultSystems,
    icons: defaultIcons,
});
