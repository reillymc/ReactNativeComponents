import type { FC, ReactNode } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    createDefaultStyles,
    type Icons,
    MergeIcons,
    MergeStyles,
    MergeTheme,
    type StyleOverrides,
    type Theme,
} from "../theme";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
    theme?: DeepPartial<Theme>;
    styles?: StyleOverrides;
    icons?: DeepPartial<Icons>;
    children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
    theme: initialTheme,
    styles: initialStyles,
    icons: initialIcons,
    children,
}: ThemeProviderProps) => {
    const theme = MergeTheme(initialTheme);
    const styles = MergeStyles(createDefaultStyles(theme), initialStyles);
    const icons = MergeIcons(initialIcons);

    const value = { theme, styles, icons };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
