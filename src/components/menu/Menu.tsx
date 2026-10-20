import {
    FlatList,
    type FlatListProps,
    type ListRenderItem,
    StyleSheet,
    View,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { MenuStyles } from "./Menu.styles";

export type MenuProps<T = unknown> = {
    data: ReadonlyArray<T>;
    renderItem: ListRenderItem<T>;
    keyExtractor: (item: T, index: number) => string;
    reverse?: boolean;
    maxHeight?: number;
    onScroll?: FlatListProps<T>["onScroll"];
    showsScrollIndicator?: boolean;
    style?: DeepPartial<MenuStyles>;

    /**
     * Passthrough for list features such as pagination/async loading
     * (`onEndReached`, `ListFooterComponent`, `refreshing`, …).
     */
    listProps?: Omit<
        FlatListProps<T>,
        | "data"
        | "renderItem"
        | "keyExtractor"
        | "inverted"
        | "horizontal"
        | "style"
        | "contentContainerStyle"
        | "showsVerticalScrollIndicator"
    >;
};

export const Menu = <T,>({
    data,
    renderItem,
    keyExtractor,
    reverse,
    maxHeight,
    onScroll,
    showsScrollIndicator,
    style,
    listProps,
}: MenuProps<T>) => {
    const [styles] = useThemedStyles("menu", createStyles, {
        styles: { menu: style },
        props: { maxHeight },
    });

    return (
        <View style={styles.container}>
            <FlatList
                {...listProps}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                inverted={reverse}
                onScroll={onScroll}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="none"
                showsVerticalScrollIndicator={showsScrollIndicator}
                style={styles.scroll}
                contentContainerStyle={styles.content}
            />
        </View>
    );
};

const createStyles = (
    { styles: { menu } }: ThemedStyles,
    { maxHeight }: { maxHeight: number | undefined },
) =>
    StyleSheet.create({
        container: {
            backgroundColor: menu.backgroundColor,
            borderRadius: menu.borderRadius,
        },
        scroll: {
            maxHeight: maxHeight ?? menu.maxHeight,
        },
        content: {
            padding: menu.padding,
            gap: menu.gap,
        },
    });
