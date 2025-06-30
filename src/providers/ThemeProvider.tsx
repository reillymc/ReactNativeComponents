import React from "react";

import type { DeepPartial } from "@reillymc/es-utils";
import { createDefaultStyles, DefaultTheme, MergeTheme, Styles, Theme } from "../theme";

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

    return <ThemeContext value={{ theme, styles }}>{children}</ThemeContext>;
};
