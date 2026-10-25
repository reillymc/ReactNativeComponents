import { useMemo } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import type { Icons, Theme } from "../../theme";
import { mergeTheme } from "../../theme/mergeTheme";
import { useThemeContext } from "../../theme/useTheme";

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

type ComponentStylesOptions<
    K extends keyof Theme,
    T,
    Props,
> = ComponentOptions<K> & {
    createStyles: (theme: Theme[K], props: Props) => T;
    props: Props;
};

type ComponentStylesOptionsWithoutProps<
    K extends keyof Theme,
    T,
> = ComponentOptions<K> & {
    createStyles: (theme: Theme[K]) => T;
};

type ComponentStylesOptionsFor<K extends ComponentKey, T, Props> =
    | ComponentStylesOptionsWithoutProps<K & keyof Theme, T>
    | ComponentStylesOptions<K & keyof Theme, T, Props>;

export function useComponent<K extends ComponentKey>(
    key: K,
    options?: ComponentOptions<K>,
): {
    theme: ComponentTheme<K>;
    icons: ComponentIcons<K>;
};

export function useComponent<K extends keyof Theme, T>(
    key: K,
    options: ComponentStylesOptionsWithoutProps<K, T>,
): {
    theme: Theme[K];
    icons: ComponentIcons<K>;
    styles: T;
};

export function useComponent<K extends keyof Theme, T, Props>(
    key: K,
    options: ComponentStylesOptions<K, T, Props>,
): {
    theme: Theme[K];
    icons: ComponentIcons<K>;
    styles: T;
};

export function useComponent<K extends ComponentKey, T, Props>(
    key: K,
    options?: ComponentOptions<K> | ComponentStylesOptionsFor<K, T, Props>,
): {
    theme: ComponentTheme<K>;
    icons: ComponentIcons<K>;
    styles?: T;
} {
    const context = useThemeContext();
    const themeOverrides = options?.themeOverrides as
        | DeepPartial<Theme[keyof Theme]>
        | undefined;
    const theme = useMemo(() => {
        if (!Object.hasOwn(context.theme, key)) {
            return undefined as ComponentTheme<K>;
        }

        const resolved = context.theme[key as keyof Theme];

        return themeOverrides === undefined
            ? (resolved as ComponentTheme<K>)
            : (mergeTheme(resolved, themeOverrides) as ComponentTheme<K>);
    }, [context.theme, key, themeOverrides]);
    const icons = (
        Object.hasOwn(context.icons, key)
            ? context.icons[key as keyof Icons]
            : undefined
    ) as ComponentIcons<K>;
    const stylesOptions =
        options && "createStyles" in options ? options : undefined;
    const createStyles = stylesOptions?.createStyles as
        | ((theme: Theme[keyof Theme], props: Props) => T)
        | undefined;
    const props =
        stylesOptions && "props" in stylesOptions
            ? stylesOptions.props
            : undefined;
    const styles = useMemo(
        () => createStyles?.(theme as Theme[keyof Theme], props as Props),
        [createStyles, theme, props],
    );

    return { theme, icons, styles };
}
