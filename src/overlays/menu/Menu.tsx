import {
    type ColorValue,
    FlatList,
    type FlatListProps,
    type ListRenderItem,
    View,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../../internal";

export type MenuTheme = {
    backgroundColor: ColorValue;
    borderRadius: number;
    padding: number;
    gap: number;
    maxHeight: number;
};

export type MenuProps<T = unknown> = {
    data: ReadonlyArray<T>;
    renderItem: ListRenderItem<T>;
    keyExtractor: (item: T, index: number) => string;
    reverse?: boolean;
    onScroll?: FlatListProps<T>["onScroll"];
    showsScrollIndicator?: boolean;
    theme?: DeepPartial<MenuTheme>;

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
    onScroll,
    showsScrollIndicator,
    theme: themeOverrides,
    listProps,
}: MenuProps<T>) => {
    const { styles } = useComponent("menu", {
        themeOverrides,
        createStyles,
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

const createStyles = defineStyles((theme: MenuTheme) => ({
    container: {
        backgroundColor: theme.backgroundColor,
        borderRadius: theme.borderRadius,
    },
    scroll: {
        maxHeight: theme.maxHeight,
    },
    content: {
        padding: theme.padding,
        gap: theme.gap,
    },
}));
