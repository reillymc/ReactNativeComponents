import { createContext, type ReactNode, use } from "react";
import { StyleSheet } from "react-native";

import type { IconOverrides } from "./icons";
import type { PaletteOverrides } from "./palette";
import type { SystemsOverrides } from "./systems";
import { ThemeContext, type ThemeContextValue } from "./ThemeContext";
import { ThemeProvider } from "./ThemeProvider";
import type { ThemeOverrides } from "./theme";

export type AppThemeFactory<AppTheme> = (
    context: ThemeContextValue,
) => AppTheme;

type AppThemeProviderProps = {
    palette?: PaletteOverrides;
    theme?: ThemeOverrides;
    systems?: SystemsOverrides;
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

        return factory({ ...baseContext, appTheme }, props as Props);
    }

    const AppThemeLayer = ({ children }: { children?: ReactNode }) => {
        const baseContext = use(ThemeContext);
        const appTheme = createValues(baseContext);

        return (
            <AppThemeContext.Provider value={appTheme}>
                {children}
            </AppThemeContext.Provider>
        );
    };

    const AppThemeProvider = ({
        children,
        ...themProviderProps
    }: AppThemeProviderProps) => (
        <ThemeProvider {...themProviderProps}>
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
