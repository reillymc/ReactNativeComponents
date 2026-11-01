import { StyleSheet } from "react-native";

export type PropFilter<Props, Keys extends keyof Props> = Required<
    Pick<Props, Keys>
>;

type StyleFactory<ThemeSlice, Props, T> = (
    theme: ThemeSlice,
    props: Props,
) => T & StyleSheet.NamedStyles<T>;

type StylesFactory<ThemeSlice, Props, T> = Props extends undefined
    ? (theme: ThemeSlice) => T
    : (theme: ThemeSlice, props: Props) => T;

export const defineStyles = <
    ThemeSlice,
    T extends StyleSheet.NamedStyles<T>,
    Props = undefined,
>(
    factory: StyleFactory<ThemeSlice, Props, T>,
) =>
    ((theme: ThemeSlice, props?: Props): T =>
        StyleSheet.create(factory(theme, props as Props))) as StylesFactory<
        ThemeSlice,
        Props,
        T
    >;
