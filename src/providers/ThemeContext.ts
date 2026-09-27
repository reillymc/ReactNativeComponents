import { createContext } from "react";

import {
    createDefaultStyles,
    DefaultIcons,
    DefaultTheme,
    type Icons,
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
