/** biome-ignore-all lint/suspicious/noExplicitAny: any prop definition is permitted */
import { useMemo } from "react";

import type { ThemeContextDefinition } from "../providers";
import {
    DefaultIcons,
    type Icons,
    MergeStyles,
    type StyleOverrides,
    type Styles,
} from "../theme";
import { useTheme } from "./useTheme";

export type { ThemeContextDefinition as ThemedStyles };

export const useThemedStyles = <
    T extends Record<string, any>,
    U extends Record<string, any> | undefined,
>(
    generator: Generator<T, U>,
    componentProps: U,
) => {
    const theme = useTheme();

    const themedStyles = useMemo(
        () => generator(theme, componentProps as any),
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
        return [
            generator(
                { theme, styles, icons: DefaultIcons },
                componentProps as any,
            ),
            styles,
        ] as const;
    }, [generator, theme, componentProps, componentStyles, originalStyles]);

    return themedStyles;
};

function hasKey<T extends object, K extends PropertyKey>(
    obj: T,
    key: K,
): key is K & keyof T {
    return key in obj;
}

type ComponentKey = keyof Styles | keyof Icons<any>;

type StyleResult<C extends ComponentKey> = (C extends keyof Styles
    ? { style: Styles[C] }
    : Record<never, never>) &
    (C extends keyof Icons<any>
        ? { icons: Icons<any>[C] }
        : Record<never, never>);

type UseStylesReturn<C extends ComponentKey, T> = readonly [T, StyleResult<C>];

type GeneratorProps<G> = G extends (...args: infer Args) => any
    ? Args extends [ThemeContextDefinition, infer U]
        ? U
        : never
    : never;

type UseStylesOptions<G> = [GeneratorProps<G>] extends [never]
    ? [
          options?: {
              styles?: StyleOverrides;
          },
      ]
    : [
          options: {
              styles?: StyleOverrides;
              props: GeneratorProps<G>;
          },
      ];

type Generator<T, U> = U extends undefined
    ? (theme: ThemeContextDefinition) => T
    : (theme: ThemeContextDefinition, props: U) => T;

export const useStyles = <
    C extends ComponentKey,
    T extends Record<string, any>,
    G extends Generator<T, any>,
>(
    componentName: C,
    generator: G,
    ...[options = {}]: UseStylesOptions<G>
): UseStylesReturn<C, T> => {
    const componentProps = "props" in options ? options.props : undefined;
    const componentStyles = "styles" in options ? options.styles : undefined;
    const { theme, styles: originalStyles, icons } = useTheme();

    const themedStyles = useMemo(() => {
        const styles = MergeStyles(originalStyles, componentStyles);

        const generated = generator({ theme, styles, icons }, componentProps);

        const componentResult = hasKey(styles, componentName)
            ? hasKey(icons, componentName)
                ? {
                      style: styles[componentName],
                      icons: icons[componentName],
                  }
                : {
                      style: styles[componentName],
                  }
            : hasKey(icons, componentName)
              ? {
                    icons: icons[componentName],
                }
              : {};

        return [generated, componentResult] as unknown as UseStylesReturn<C, T>;
    }, [
        generator,
        theme,
        icons,
        componentProps,
        componentStyles,
        componentName,
        originalStyles,
    ]);

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
