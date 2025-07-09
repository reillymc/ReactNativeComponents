import { createContext, type FC, type ReactNode } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    createDefaultStyles,
    DefaultTheme,
    MergeTheme,
    type Styles,
    type Theme,
} from "../theme";

export interface ThemeContextDefinition {
    theme: Theme;
    styles: Styles;
}

export const ThemeContext = createContext<ThemeContextDefinition>({
    theme: DefaultTheme,
    styles: createDefaultStyles(DefaultTheme),
});

interface ThemeProviderProps {
    theme?: DeepPartial<Theme>;
    styles?: Styles;
    children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
    theme: initialTheme,
    styles: initialStyles,
    children,
}: ThemeProviderProps) => {
    const theme = MergeTheme(DefaultTheme, initialTheme);
    const styles = initialStyles ?? createDefaultStyles(theme);

    return <ThemeContext value={{ theme, styles }}>{children}</ThemeContext>;
};
