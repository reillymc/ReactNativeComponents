import type { ReactNode } from "react";

import { type IconOverrides, mergeIcons } from "./icons";
import { createPalette, type PaletteOverrides } from "./palette";
import { resolveTheme } from "./resolveTheme";
import { createSystems, type SystemsOverrides } from "./systems";
import { ThemeContext } from "./ThemeContext";
import type { ThemeOverrides } from "./theme";

export interface ThemeProviderProps {
    /**
     * Base design tokens. Overrides are merged over `defaultPalette`.
     */
    palette?: PaletteOverrides;
    /**
     * Component theme overrides.
     */
    theme?: ThemeOverrides;
    /**
     * Shared interaction, accessibility, and touch defaults.
     */
    systems?: SystemsOverrides;
    /**
     * Component icon overrides.
     */
    icons?: IconOverrides;
    children?: ReactNode;
}

export const ThemeProvider = ({
    palette: initialPalette,
    theme: initialTheme,
    systems: initialSystems,
    icons: initialIcons,
    children,
}: ThemeProviderProps) => {
    const palette = createPalette(initialPalette);
    const theme = resolveTheme(palette, initialTheme);
    const systems = createSystems(palette, initialSystems);
    const icons = mergeIcons(initialIcons);

    const value = { palette, theme, systems, icons };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
