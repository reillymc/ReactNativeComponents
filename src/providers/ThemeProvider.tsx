import { type FC, type ReactNode, useMemo } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import {
    createDefaultStyles,
    DefaultIcons,
    DefaultTheme,
    type Icons,
    MergeStyles,
    MergeTheme,
    type StyleOverrides,
    type Theme,
} from "../theme";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
    theme?: DeepPartial<Theme>;
    styles?: StyleOverrides;
    icons?: Icons;
    children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
    theme: initialTheme,
    styles: initialStyles,
    icons: initialIcons,
    children,
}: ThemeProviderProps) => {
    const theme = useMemo(
        () => MergeTheme(DefaultTheme, initialTheme),
        [initialTheme],
    );
    const styles = useMemo(
        () => MergeStyles(createDefaultStyles(theme), initialStyles),
        [theme, initialStyles],
    );
    const icons = initialIcons ?? DefaultIcons;

    const value = useMemo(
        () => ({ theme, styles, icons }),
        [theme, styles, icons],
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};
