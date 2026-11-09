import { StyleSheet } from "react-native";

export type StyleRules = StyleSheet.NamedStyles<Record<string, unknown>>;

export type ThemedStylesFactory<C> = <
    T extends StyleSheet.NamedStyles<T> | StyleRules,
    P extends readonly unknown[] = [],
>(
    factory: (context: C, ...props: P) => T & StyleRules,
) => (context: C, ...props: P) => T;

export const createThemedStylesFactory =
    <C>(): ThemedStylesFactory<C> =>
    (factory) =>
    (context, ...props) =>
        StyleSheet.create(factory(context, ...props));
