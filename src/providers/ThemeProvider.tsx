import type { ReactNode } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { type Icons, MergeIcons } from "../icons/componentIcons";
import type { StyleFactory } from "../style/styleFactory";
import { createStyles } from "../style/styles";
import { MergeTheme, type ThemeOverrides } from "../theme/theme";
import { ThemeContext } from "./ThemeContext";

export interface ThemeProviderProps<E extends object = Record<never, never>> {
    /**
     * The active theme.
     */
    theme?: ThemeOverrides;
    /**
     * Style overrides factory. App-owned component slices can be added by
     * extending `E`.
     */
    styles?: StyleFactory<E>;
    icons?: DeepPartial<Icons>;
    children?: ReactNode;
}

export const ThemeProvider = <E extends object = Record<never, never>>({
    theme: initialTheme,
    styles: initialStyles,
    icons: initialIcons,
    children,
}: ThemeProviderProps<E>) => {
    const theme = MergeTheme(initialTheme);
    const styles = createStyles<E>(theme, initialStyles);
    const icons = MergeIcons(initialIcons);

    const value = { theme, styles, icons };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
