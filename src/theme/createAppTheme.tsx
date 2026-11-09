import { createContext, type ReactNode, use } from "react";
import {
    type ImageStyle,
    StyleSheet,
    type TextStyle,
    type ViewStyle,
} from "react-native";

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

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type AppThemedStylesFactory<AppTheme, Props, T extends NamedStyles<T>> = (
    context: AppThemedStylesContext<AppTheme>,
    props: Props,
) => T & NamedStyles<T>;

export const createAppTheme = <AppTheme extends object>(
    createValues: AppThemeFactory<AppTheme>,
) => {
    const AppThemeContext = createContext<AppTheme | undefined>(undefined);

    // biome-ignore lint/correctness/noComponentHookFactories: stable hook created once by a module-scope factory call.
    const useAppTheme = (): AppTheme => {
        const appTheme = use(AppThemeContext);

        if (appTheme === undefined) {
            throw new Error("useAppTheme must be used within AppThemeProvider");
        }

        return appTheme;
    };

    const defineStyles =
        <T extends NamedStyles<T>, Props = undefined>(
            factory: AppThemedStylesFactory<AppTheme, Props, T>,
        ) =>
        (context: AppThemedStylesContext<AppTheme>, props: Props): T =>
            StyleSheet.create(factory(context, props));

    function useStyles<T extends NamedStyles<T>>(
        factory: AppThemedStylesFactory<AppTheme, undefined, T>,
    ): T;
    function useStyles<T extends NamedStyles<T>, Props>(
        factory: AppThemedStylesFactory<AppTheme, Props, T>,
        props: Props,
    ): T;
    // biome-ignore lint/correctness/noComponentHookFactories: stable hook created once by a module-scope factory call.
    function useStyles<T extends NamedStyles<T>, Props>(
        factory: AppThemedStylesFactory<AppTheme, Props, T>,
        props?: Props,
    ): T {
        const baseContext = use(ThemeContext);
        const appTheme = useAppTheme();

        return factory({ ...baseContext, appTheme }, props as Props);
    }

    // biome-ignore lint/correctness/noComponentHookFactories: stable component created once by a module-scope factory call.
    const AppThemeLayer = ({ children }: { children?: ReactNode }) => {
        const baseContext = use(ThemeContext);
        const appTheme = createValues(baseContext);

        return (
            <AppThemeContext.Provider value={appTheme}>
                {children}
            </AppThemeContext.Provider>
        );
    };

    // biome-ignore lint/correctness/noComponentHookFactories: stable component created once by a module-scope factory call.
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
