/** biome-ignore-all lint/suspicious/noExplicitAny: any prop definition is permitted */
import type { ThemeContextDefinition } from "../providers";
import type { Icons, StyleOverrides, Styles } from "../theme";
import { MergeStyleSlice } from "../theme/styles";
import { useTheme } from "./useTheme";

export type ThemedStyles<E extends object = Record<never, never>> =
    ThemeContextDefinition<E>;

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
    Parameters<G> extends [ThemeContextDefinition<any>, infer U] ? U : never;

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

const mergeStylesForComponent = (
    styles: Styles,
    name: ComponentKey,
    override: unknown,
): { config: unknown; styles: Styles } => {
    if (!hasKey(styles, name)) {
        return { config: undefined, styles };
    }

    const base = styles[name];
    const config = MergeStyleSlice(base, override);

    return {
        config,
        styles:
            config === base
                ? styles
                : ({ ...styles, [name]: config } as Styles),
    };
};

/**
 * Builds the `[style, icons]` result for a named component, matching the
 * shape of `ComponentRegistry`.
 */
const buildComponentResult = (
    styles: Styles,
    icons: Icons,
    name: ComponentKey,
    config: unknown,
) => {
    const hasStyle = hasKey(styles, name);
    const hasIcons = hasKey(icons, name);

    if (hasStyle && hasIcons) {
        return { style: config, icons: icons[name] };
    }

    if (hasStyle) {
        return { style: config };
    }

    if (hasIcons) {
        return { icons: icons[name] };
    }

    return {};
};

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
    const { theme, styles, icons } = useTheme();

    const name = componentName as ComponentKey;
    const { config, styles: stylesForGenerator } = isComponent
        ? mergeStylesForComponent(styles, name, componentStyles?.[name])
        : { config: undefined, styles };

    const generatorInput = {
        theme,
        styles: stylesForGenerator,
        icons,
    } as ThemeContextDefinition<never>;

    const generated = hasProps
        ? generator(generatorInput, componentProps)
        : generator(generatorInput);

    return isComponent
        ? [generated, buildComponentResult(styles, icons, name, config)]
        : generated;
}

export const useStyles = (componentStyles: StyleOverrides) => {
    const { styles } = useTheme();

    let merged: Styles = styles;
    for (const key of Object.keys(componentStyles) as Array<keyof Styles>) {
        const override = componentStyles[key];
        if (override === undefined) continue;

        const base = styles[key];
        const next = MergeStyleSlice(base, override);
        if (next !== base) {
            merged = { ...merged, [key]: next };
        }
    }

    return merged;
};
