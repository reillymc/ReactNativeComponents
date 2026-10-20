import { createContext } from "react";

import { DefaultIcons, type Icons } from "../icons/componentIcons";
import { createStyles, type Styles } from "../style/styles";
import { DefaultTheme, type Theme } from "../theme/theme";

export interface ThemeContextDefinition<
    E extends object = Record<never, never>,
> {
    theme: Theme;
    styles: Styles & E;
    icons: Icons;
}

export const ThemeContext = createContext<ThemeContextDefinition>({
    theme: DefaultTheme,
    styles: createStyles(DefaultTheme),
    icons: DefaultIcons,
});
