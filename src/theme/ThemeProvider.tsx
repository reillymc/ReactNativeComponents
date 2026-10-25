import { type ReactNode, useMemo } from "react";

import { type IconOverrides, mergeIcons } from "./icons";
import { createPalette, type PaletteOverrides } from "./palette";
import { resolveTheme } from "./resolveTheme";
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
     * Component icon overrides.
     */
    icons?: IconOverrides;
    children?: ReactNode;
}

export const ThemeProvider = ({
    palette: initialPalette,
    theme: initialTheme,
    icons: initialIcons,
    children,
}: ThemeProviderProps) => {
    const palette = useMemo(
        () => createPalette(initialPalette),
        [initialPalette],
    );
    const theme = useMemo(
        () => resolveTheme(palette, initialTheme),
        [palette, initialTheme],
    );
    const icons = useMemo(() => mergeIcons(initialIcons), [initialIcons]);

    const value = useMemo(
        () => ({ palette, theme, icons }),
        [palette, theme, icons],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
