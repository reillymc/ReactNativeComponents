import React from "react";

import { createDefaultStyles, DefaultTheme, Styles, Theme } from "../theme";

export interface ThemeContextDefinition {
    theme: Theme;
    styles: Styles;
}

export const ThemeContext = React.createContext<ThemeContextDefinition>({
    theme: DefaultTheme,
    styles: createDefaultStyles(DefaultTheme),
});

interface ThemeProviderProps {
    theme?: Theme;
    styles?: Styles;
    children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme = DefaultTheme,
    styles = createDefaultStyles(theme),
    children,
}: ThemeProviderProps) => <ThemeContext.Provider value={{ theme, styles }}>{children}</ThemeContext.Provider>;
