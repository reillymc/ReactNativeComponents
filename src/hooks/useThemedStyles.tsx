/** biome-ignore-all lint/suspicious/noExplicitAny: any prop definition is permitted */
import type { Icons } from "../icons/componentIcons";
import type { ThemeContextDefinition } from "../providers";
import { mergeStyle, type StyleOverrides, type Styles } from "../style/styles";
import { useTheme } from "./useTheme";

export type ThemedStyles<E extends object = Record<never, never>> =
    ThemeContextDefinition<E>;

function hasKey<T extends object, K extends PropertyKey>(
    obj: T,
    key: K,
): key is K & keyof T {
    return key in obj;
}

type StyleOnlyKey<E extends object> = keyof Styles | keyof E;
type IconOnlyKey = keyof Icons;
type ComponentKey<E extends object> = StyleOnlyKey<E> | IconOnlyKey;

type ComponentRegistry<E extends object> = {
    [K in keyof Styles | keyof E | keyof Icons]: (K extends keyof Styles
        ? { style: Styles[K] }
        : K extends keyof E
          ? { style: E[K] }
          : Record<never, never>) &
        (K extends keyof Icons ? { icons: Icons[K] } : Record<never, never>);
};

type StyleResult<
    E extends object,
    C extends ComponentKey<E>,
> = ComponentRegistry<E>[C];

type UseStylesReturn<
    E extends object,
    C extends ComponentKey<E>,
    G = undefined,
> = [generated: G, component: StyleResult<E, C>];
type AnyGenerator = (...args: any[]) => any;

type GeneratorResult<G extends AnyGenerator> = ReturnType<G>;

type GeneratorProps<G extends AnyGenerator> =
    Parameters<G> extends [ThemeContextDefinition<any>, infer U] ? U : never;

type GeneratorExtension<G extends AnyGenerator> =
    Parameters<G>[0] extends ThemeContextDefinition<infer E>
        ? E
        : Record<never, never>;

type UseStylesOptions<E extends object, G extends AnyGenerator> = [
    GeneratorProps<G>,
] extends [never]
    ? [
          options?: {
              styles?: StyleOverrides<E>;
          },
      ]
    : [
          options: {
              styles?: StyleOverrides<E>;
              props: GeneratorProps<G>;
          },
      ];

const EMPTY_OPTIONS: {
    styles?: StyleOverrides;
    props?: unknown;
} = {};

const mergeStylesForComponent = <E extends object>(
    styles: Styles & E,
    name: ComponentKey<E>,
    override: unknown,
): { config: unknown; styles: Styles & E } => {
    if (!hasKey(styles, name)) {
        return { config: undefined, styles };
    }

    const base = styles[name];
    const config = mergeStyle(base, override);

    return {
        config,
        styles:
            config === base
                ? styles
                : ({ ...styles, [name]: config } as Styles & E),
    };
};

/**
 * Builds the `[style, icons]` result for a named component, matching the
 * shape of `ComponentRegistry`.
 */
const buildComponentResult = <E extends object>(
    styles: Styles & E,
    icons: Icons,
    name: ComponentKey<E>,
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
 *
 * The style extension is inferred from the generator's context type, so app
 * components can read their own style slices by annotating the generator with
 * the app's `ThemedStyles<AppStyles>` type.
 */
export function useThemedStyles<
    G extends AnyGenerator,
    C extends ComponentKey<GeneratorExtension<G>> = ComponentKey<
        GeneratorExtension<G>
    >,
>(
    componentName: C,
    generator: G,
    ...options: UseStylesOptions<GeneratorExtension<G>, G>
): UseStylesReturn<GeneratorExtension<G>, C, GeneratorResult<G>>;
export function useThemedStyles<G extends AnyGenerator>(
    generator: G,
    ...options: UseStylesOptions<GeneratorExtension<G>, G>
): GeneratorResult<G>;
export function useThemedStyles(...args: any[]) {
    const first = args[0];
    const isComponent = typeof first === "string";
    const componentName = (isComponent ? first : undefined) as
        | ComponentKey<Record<never, never>>
        | undefined;
    const generator = (isComponent ? args[1] : first) as AnyGenerator;
    const options = (isComponent ? args[2] : args[1]) ?? EMPTY_OPTIONS;

    const hasProps = "props" in options;
    const componentProps = hasProps ? options.props : undefined;
    const componentStyles = "styles" in options ? options.styles : undefined;
    const { theme, styles, icons } = useTheme();

    const name = componentName as ComponentKey<Record<never, never>>;
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

export const useStyles = <E extends object = Record<never, never>>(
    componentStyles: StyleOverrides<E>,
): Styles & E => {
    const { styles } = useTheme<E>();

    let merged: Styles & E = styles;
    const overrides = componentStyles as Record<string, unknown>;
    for (const key of Object.keys(componentStyles) as Array<
        keyof (Styles & E)
    >) {
        const override = overrides[key as string];
        if (override === undefined) continue;

        const base = styles[key];
        const next = mergeStyle(base, override);
        if (next !== base) {
            merged = { ...merged, [key]: next };
        }
    }

    return merged;
};
