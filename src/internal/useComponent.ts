import type { DeepPartial } from "@reillymc/es-utils";

import type { Icons } from "../theme/icons";
import { mergeTheme } from "../theme/mergeTheme";
import type { Theme } from "../theme/theme";
import { useThemeContext } from "../theme/useTheme";

type ComponentKey = keyof Theme | keyof Icons;

type ComponentTheme<K extends ComponentKey> = K extends keyof Theme
    ? Theme[K]
    : undefined;

type ComponentIcons<K extends ComponentKey> = K extends keyof Icons
    ? Icons[K]
    : undefined;

type ComponentOptions<K extends ComponentKey> = {
    themeOverrides?: K extends keyof Theme ? DeepPartial<Theme[K]> : never;
};

type ComponentStylesOptions<K extends keyof Theme, T> = ComponentOptions<K> & {
    createStyles: (theme: Theme[K]) => T;
};

type ComponentStylesOptionsWithProps<
    K extends keyof Theme,
    T,
    Props,
> = ComponentOptions<K> & {
    createStyles: (theme: Theme[K], props: Props) => T;
    props: Props;
};

type ImplementationOptions<
    K extends ComponentKey,
    T,
    Props,
> = ComponentOptions<K> & {
    createStyles?: (theme: ComponentTheme<K>, props: Props) => T;
    props?: Props;
};

const resolveComponentTheme = <K extends ComponentKey>(
    theme: Theme,
    key: K,
    themeOverrides: DeepPartial<Theme[keyof Theme]> | undefined,
): ComponentTheme<K> => {
    if (!Object.hasOwn(theme, key)) {
        return undefined as ComponentTheme<K>;
    }

    const resolved = theme[key as keyof Theme];

    return (
        themeOverrides === undefined
            ? resolved
            : mergeTheme(resolved, themeOverrides)
    ) as ComponentTheme<K>;
};

export function useComponent<K extends ComponentKey>(
    key: K,
    options?: ComponentOptions<K>,
): {
    theme: ComponentTheme<K>;
    icons: ComponentIcons<K>;
};

export function useComponent<K extends keyof Theme, T>(
    key: K,
    options: ComponentStylesOptions<K, T>,
): {
    theme: Theme[K];
    icons: ComponentIcons<K>;
    styles: T;
};

export function useComponent<K extends keyof Theme, T, Props>(
    key: K,
    options: ComponentStylesOptionsWithProps<K, T, Props>,
): {
    theme: Theme[K];
    icons: ComponentIcons<K>;
    styles: T;
};

export function useComponent<K extends ComponentKey, T, Props>(
    key: K,
    options?: ImplementationOptions<K, T, Props>,
): {
    theme: ComponentTheme<K>;
    icons: ComponentIcons<K>;
    styles?: T;
} {
    const context = useThemeContext();
    const themeOverrides = options?.themeOverrides as
        | DeepPartial<Theme[keyof Theme]>
        | undefined;
    const theme = resolveComponentTheme(context.theme, key, themeOverrides);
    const icons = (
        Object.hasOwn(context.icons, key)
            ? context.icons[key as keyof Icons]
            : undefined
    ) as ComponentIcons<K>;
    const createStyles = options?.createStyles;
    const props = options && "props" in options ? options.props : undefined;
    const styles = createStyles?.(theme, props as Props);

    return { theme, icons, styles };
}
