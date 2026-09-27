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
type IconOnlyKey = keyof Icons;
type ComponentKey = StyleOnlyKey | IconOnlyKey;

type ComponentRegistry = {
    [K in keyof Styles | keyof Icons]: K extends keyof Styles
        ? K extends keyof Icons
            ? {
                  style: Styles[K];
                  icons: Icons[K];
              }
            : {
                  style: Styles[K];
              }
        : K extends keyof Icons
          ? {
                icons: Icons[K];
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

const EMPTY_OPTIONS: {
    styles?: StyleOverrides;
    props?: unknown;
} = {};

/**
 * Reads themed styles.
 *
 * Two call forms:
 * - `useThemedStyles(componentName, generator, options?)` — component form.
 *   Returns `[generated, { style, icons }]` for the named component.
 * - `useThemedStyles(generator, options?)` — external form.
 *   Returns just the generated styles.
 */
export function useThemedStyles<C extends ComponentKey, G extends AnyGenerator>(
    componentName: C,
    generator: G,
    ...options: UseStylesOptions<G>
): UseStylesReturn<C, GeneratorResult<G>>;
export function useThemedStyles<G extends AnyGenerator>(
    generator: G,
    ...options: UseStylesOptions<G>
): GeneratorResult<G>;
export function useThemedStyles(...args: any[]) {
    const first = args[0];
    const isComponent = typeof first === "string";
    const componentName = (isComponent ? first : undefined) as
        | ComponentKey
        | undefined;
    const generator = (isComponent ? args[1] : first) as AnyGenerator;
    const options = (isComponent ? args[2] : args[1]) ?? EMPTY_OPTIONS;

    const hasProps = "props" in options;
    const componentProps = hasProps ? options.props : undefined;
    const componentStyles = "styles" in options ? options.styles : undefined;
    const { theme, styles: originalStyles, icons } = useTheme();

    const themedStyles = useMemo(() => {
        const styles = MergeStyles(originalStyles, componentStyles);
        const generated = hasProps
            ? generator({ theme, styles, icons }, componentProps)
            : generator({ theme, styles, icons });

        if (!isComponent) {
            return generated;
        }

        const name = componentName as ComponentKey;
        const componentResult = hasKey(styles, name)
            ? hasKey(icons, name)
                ? {
                      style: styles[name],
                      icons: icons[name],
                  }
                : {
                      style: styles[name],
                  }
            : hasKey(icons, name)
              ? {
                    icons: icons[name],
                }
              : {};

        return [generated, componentResult];
    }, [
        generator,
        theme,
        icons,
        componentProps,
        componentStyles,
        componentName,
        originalStyles,
        hasProps,
        isComponent,
    ]);

    return themedStyles;
}

export const useStyles = (componentStyles: StyleOverrides) => {
    const { styles: originalStyles } = useTheme();

    const themedStyles = useMemo(
        () => MergeStyles(originalStyles, componentStyles),
        [componentStyles, originalStyles],
    );

    return themedStyles;
};
