import { createContext, type ReactNode, use, useMemo } from "react";
import { StyleSheet } from "react-native";

import type { IconOverrides } from "./icons";
import type { PaletteOverrides } from "./palette";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";
import { ThemeProvider } from "./ThemeProvider";
import type { ThemeOverrides } from "./theme";

export type AppThemeFactory<AppTheme> = (
    context: ThemeContextValue,
) => AppTheme;

type AppThemeProviderProps = {
    palette?: PaletteOverrides;
    theme?: ThemeOverrides;
    icons?: IconOverrides;
    children?: ReactNode;
};

type AppThemedStylesContext<AppTheme> = ThemeContextValue & {
    appTheme: AppTheme;
};

type AppThemedStylesFactory<
    AppTheme,
    Props,
    T extends StyleSheet.NamedStyles<T>,
> = (context: AppThemedStylesContext<AppTheme>, props: Props) => T;

export const createAppTheme = <AppTheme extends object>(
    createValues: AppThemeFactory<AppTheme>,
) => {
    const AppThemeContext = createContext<AppTheme | undefined>(undefined);

    const useAppTheme = (): AppTheme => {
        const appTheme = use(AppThemeContext);

        if (appTheme === undefined) {
            throw new Error("useAppTheme must be used within AppThemeProvider");
        }

        return appTheme;
    };

    const defineStyles =
        <T extends StyleSheet.NamedStyles<T>, Props = undefined>(
            factory: AppThemedStylesFactory<AppTheme, Props, T>,
        ) =>
        (context: AppThemedStylesContext<AppTheme>, props: Props): T =>
            StyleSheet.create(factory(context, props));

    function useStyles<T extends StyleSheet.NamedStyles<T>>(
        factory: AppThemedStylesFactory<AppTheme, undefined, T>,
    ): T;
    function useStyles<T extends StyleSheet.NamedStyles<T>, Props>(
        factory: AppThemedStylesFactory<AppTheme, Props, T>,
        props: Props,
    ): T;
    function useStyles<T extends StyleSheet.NamedStyles<T>, Props>(
        factory: AppThemedStylesFactory<AppTheme, Props, T>,
        props?: Props,
    ): T {
        const baseContext = use(ThemeContext);
        const appTheme = useAppTheme();
        const context = useMemo(
            () => ({ ...baseContext, appTheme }),
            [baseContext, appTheme],
        );

        return useMemo(
            () => factory(context, props as Props),
            [factory, context, props],
        );
    }

    const AppThemeLayer = ({ children }: { children?: ReactNode }) => {
        const baseContext = use(ThemeContext);
        const appTheme = useMemo(
            () => createValues(baseContext),
            [baseContext],
        );

        return (
            <AppThemeContext.Provider value={appTheme}>
                {children}
            </AppThemeContext.Provider>
        );
    };

    const AppThemeProvider = ({
        palette,
        theme,
        icons,
        children,
    }: AppThemeProviderProps) => (
        <ThemeProvider palette={palette} theme={theme} icons={icons}>
            <AppThemeLayer>{children}</AppThemeLayer>
        </ThemeProvider>
    );

    return {
        // biome-ignore lint/style/useNamingConvention: component export
        AppThemeProvider,
        useAppTheme,
        defineStyles,
        useStyles,
    };
};
