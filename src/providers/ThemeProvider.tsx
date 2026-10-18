import type { ReactNode } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    createStyles,
    type Icons,
    type StyleOverrides,
    type ThemeOverrides,
} from "../theme";
import { MergeIcons } from "../theme/icons";
import { MergeTheme } from "../theme/theme";
import { ThemeContext } from "./ThemeContext";

export interface ThemeProviderProps<E extends object = Record<never, never>> {
    /**
     * The active theme. Consumers may extend it with their own tokens
     * (`ThemeOverrides & E`) and read them back via `useTheme<E>()`.
     */
    theme?: ThemeOverrides & E;
    styles?: StyleOverrides;
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
    const styles = createStyles(theme, initialStyles);
    const icons = MergeIcons(initialIcons);

    const value = { theme, styles, icons };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
