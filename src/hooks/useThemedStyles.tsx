/** biome-ignore-all lint/suspicious/noExplicitAny: any prop definition is permitted */
import { useMemo } from "react";

import type { ThemeContextDefinition } from "../providers";
import { MergeStyles, type StyleOverrides } from "../theme";
import { useTheme } from "./useTheme";

export type { ThemeContextDefinition as ThemedStyles };

export type Generator<
    T extends Record<string, any>,
    U extends Record<string, any> | undefined,
> = (theme: ThemeContextDefinition, componentProps: U) => T;

export const useThemedStyles = <
    T extends Record<string, any>,
    U extends Record<string, any> | undefined,
>(
    generator: Generator<T, U>,
    componentProps: U,
) => {
    const theme = useTheme();

    const themedStyles = useMemo(
        () => generator(theme, componentProps),
        [generator, theme, componentProps],
    );

    return themedStyles;
};

export const useThemedStylesWithOverride = <
    T extends Record<string, any>,
    U extends Record<string, any> | undefined,
>(
    generator: Generator<T, U>,
    componentStyles: StyleOverrides,
    componentProps: U,
) => {
    const { theme, styles: originalStyles } = useTheme();

    const themedStyles = useMemo(() => {
        const styles = MergeStyles(originalStyles, componentStyles);
        return [generator({ theme, styles }, componentProps), styles] as const;
    }, [generator, theme, componentProps, componentStyles, originalStyles]);

    return themedStyles;
};

export const useStylesWithOverride = (componentStyles: StyleOverrides) => {
    const { styles: originalStyles } = useTheme();

    const themedStyles = useMemo(
        () => MergeStyles(originalStyles, componentStyles),
        [componentStyles, originalStyles],
    );

    return themedStyles;
};
