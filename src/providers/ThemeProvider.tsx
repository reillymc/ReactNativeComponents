import React from "react";
import { DeepPartial } from "../helpers";

import { createDefaultStyles, DefaultTheme, Styles, Theme, MergeTheme } from "../theme";

export interface ThemeContextDefinition {
    theme: Theme;
    styles: Styles;
}

export const ThemeContext = React.createContext<ThemeContextDefinition>({
    theme: DefaultTheme,
    styles: createDefaultStyles(DefaultTheme),
});

interface ThemeProviderProps {
    theme?: DeepPartial<Theme>;
    styles?: Styles;
    children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme: initialTheme,
    styles: initialStyles,
    children,
}: ThemeProviderProps) => {
    const theme = MergeTheme(DefaultTheme, initialTheme);
    const styles = initialStyles ?? createDefaultStyles(theme);

    return <ThemeContext.Provider value={{ theme, styles }}>{children}</ThemeContext.Provider>;
};
