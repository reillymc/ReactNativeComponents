import { createContext } from "react";

import type { Icons, Styles, Theme } from "../theme";
import { DefaultIcons } from "../theme/icons";
import { createStyles } from "../theme/styles";
import { DefaultTheme } from "../theme/theme";

export interface ThemeContextDefinition<
    E extends object = Record<never, never>,
> {
    theme: Theme & E;
    styles: Styles;
    icons: Icons;
}

export const ThemeContext = createContext<ThemeContextDefinition>({
    theme: DefaultTheme,
    styles: createStyles(DefaultTheme),
    icons: DefaultIcons,
});
