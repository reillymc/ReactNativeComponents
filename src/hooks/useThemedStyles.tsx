/** biome-ignore-all lint/suspicious/noExplicitAny: any prop definition is permitted */
import { useMemo } from "react";

import type { ThemeContextDefinition as ThemedStyles } from "../providers";
import {
    type Icons,
    MergeStyles,
    type StyleOverrides,
    type Styles,
} from "../theme";
import { useTheme } from "./useTheme";

export type { ThemedStyles };

function hasKey<T extends object, K extends PropertyKey>(
    obj: T,
    key: K,
): key is K & keyof T {
    return key in obj;
}

type StyleOnlyKey = keyof Styles;
type IconOnlyKey = keyof Icons<any>;
type ComponentKey = StyleOnlyKey | IconOnlyKey;

type ComponentRegistry = {
    [K in keyof Styles | keyof Icons<any>]: K extends keyof Styles
        ? K extends keyof Icons<any>
            ? {
                  style: Styles[K];
                  icons: Icons<any>[K];
              }
            : {
                  style: Styles[K];
              }
        : K extends keyof Icons<any>
          ? {
                icons: Icons<any>[K];
            }
          : never;
};

type StyleResult<C extends keyof ComponentRegistry> = ComponentRegistry[C];

type UseStylesReturn<C extends ComponentKey, G = undefined> = [
    generated: G,
    component: StyleResult<C>,
];
type AnyGenerator = (...args: any[]) => any;

type GeneratorResult<G extends AnyGenerator> = ReturnType<G>;

type GeneratorProps<G extends AnyGenerator> =
    Parameters<G> extends [ThemedStyles, infer U] ? U : never;

type UseStylesOptions<G extends AnyGenerator> = [GeneratorProps<G>] extends [
    never,
]
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

export const useThemedStyles = <
    C extends ComponentKey,
    G extends (...args: any[]) => any,
>(
    componentName: C,
    generator: G,
    ...[options = {}]: UseStylesOptions<G>
): UseStylesReturn<C, GeneratorResult<G>> => {
    const componentProps = "props" in options ? options.props : undefined;
    const componentStyles = "styles" in options ? options.styles : undefined;
    const { theme, styles: originalStyles, icons } = useTheme();

    const themedStyles = useMemo(() => {
        const styles = MergeStyles(originalStyles, componentStyles);

        const generated =
            "props" in options
                ? generator({ theme, styles, icons }, componentProps)
                : generator({ theme, styles, icons });

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

        return [generated, componentResult] as [
            GeneratorResult<G>,
            StyleResult<C>,
        ];
    }, [
        generator,
        theme,
        icons,
        options,
        componentProps,
        componentStyles,
        componentName,
        originalStyles,
    ]);

    return themedStyles;
};

export const useThemedStylesExternal = <G extends (...args: any[]) => any>(
    generator: G,
    ...[options = {}]: UseStylesOptions<G>
): GeneratorResult<G> => {
    const componentProps = "props" in options ? options.props : undefined;
    const componentStyles = "styles" in options ? options.styles : undefined;
    const { theme, styles: originalStyles, icons } = useTheme();

    const themedStyles = useMemo(() => {
        const styles = MergeStyles(originalStyles, componentStyles);

        const generated =
            "props" in options
                ? generator({ theme, styles, icons }, componentProps)
                : generator({ theme, styles, icons });

        return generated;
    }, [
        generator,
        theme,
        icons,
        options,
        componentProps,
        componentStyles,
        originalStyles,
    ]);

    return themedStyles;
};

export const useStyles = (componentStyles: StyleOverrides) => {
    const { styles: originalStyles } = useTheme();

    const themedStyles = useMemo(
        () => MergeStyles(originalStyles, componentStyles),
        [componentStyles, originalStyles],
    );

    return themedStyles;
};
