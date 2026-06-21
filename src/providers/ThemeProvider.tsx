import { createContext, type FC, type ReactNode } from "react";
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

export interface ThemeContextDefinition {
    theme: Theme;
    styles: Styles;
    icons: Icons;
}

export const ThemeContext = createContext<ThemeContextDefinition>({
    theme: DefaultTheme,
    styles: createDefaultStyles(DefaultTheme),
    icons: DefaultIcons,
});

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
        <ThemeContext value={{ theme, styles, icons }}>{children}</ThemeContext>
    );
};
