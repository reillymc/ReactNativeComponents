import { StyleSheet } from "react-native";

export type PropFilter<Props, Keys extends keyof Props> = Required<
    Pick<Props, Keys>
>;

export const defineStyles = <
    ThemeSlice,
    T extends StyleSheet.NamedStyles<T>,
    Props = undefined,
>(
    factory: (theme: ThemeSlice, props: Props) => T,
) =>
    ((theme: ThemeSlice, props?: Props): T =>
        StyleSheet.create(
            factory(theme, props as Props),
        )) as Props extends undefined
        ? (theme: ThemeSlice) => T
        : (theme: ThemeSlice, props: Props) => T;
