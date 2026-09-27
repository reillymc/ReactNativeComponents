import type { FC, ReactNode } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    createDefaultStyles,
    DefaultIcons,
    DefaultTheme,
    type Icons,
    MergeTheme,
    type Styles,
    type Theme,
} from "../theme";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
    theme?: DeepPartial<Theme>;
    styles?: Styles;
    icons?: Icons;
    children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
    theme: initialTheme,
    styles: initialStyles,
    icons: initialIcons,
    children,
}: ThemeProviderProps) => {
    const theme = MergeTheme(DefaultTheme, initialTheme);
    const styles = initialStyles ?? createDefaultStyles(theme);
    const icons = initialIcons ?? DefaultIcons;

    return (
        <ThemeContext.Provider value={{ theme, styles, icons }}>
            {children}
        </ThemeContext.Provider>
    );
};
