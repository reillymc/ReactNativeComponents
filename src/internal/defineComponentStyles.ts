import {
    type ImageStyle,
    StyleSheet,
    type TextStyle,
    type ViewStyle,
} from "react-native";

export type PropFilter<Props, Keys extends keyof Props> = Required<
    Pick<Props, Keys>
>;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type StyleFactory<ThemeSlice, Props, T> = (
    theme: ThemeSlice,
    props: Props,
) => T & NamedStyles<T>;

type StylesFactory<ThemeSlice, Props, T> = Props extends undefined
    ? (theme: ThemeSlice) => T
    : (theme: ThemeSlice, props: Props) => T;

export const defineStyles = <
    ThemeSlice,
    T extends NamedStyles<T>,
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
