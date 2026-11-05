import {
    type ColorValue,
    FlatList,
    type FlatListProps,
    type ListRenderItem,
    View,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../../internal";
import { useSystems } from "../../theme/useSystems";
import { ScrollViewContextResetter } from "./ScrollViewContextResetter";
import { useMenuScroll } from "./useMenuScroll";
import { VirtualizedListContextResetter } from "./VirtualizedListContextResetter";

export type MenuTheme = {
    backgroundColor: ColorValue;
    borderRadius: number;
    padding: number;
    gap: number;
    maxHeight: number;
    textColor: ColorValue;
};

export type MenuProps<T = unknown> = {
    data: ReadonlyArray<T>;
    renderItem: ListRenderItem<T>;
    keyExtractor: (item: T, index: number) => string;
    activeIndex?: number;
    reverse?: boolean;
    onScroll?: FlatListProps<T>["onScroll"];
    showsScrollIndicator?: boolean;
    theme?: DeepPartial<MenuTheme>;
    /**
     * Change this value to reset the list to `activeIndex` without animating
     */
    scrollResetKey?: string | number;
} & Omit<
    FlatListProps<T>,
    | "data"
    | "renderItem"
    | "keyExtractor"
    | "inverted"
    | "horizontal"
    | "style"
    | "contentContainerStyle"
    | "showsVerticalScrollIndicator"
    | "initialScrollIndex"
    | "onScroll"
    | "onScrollToIndexFailed"
>;

export const Menu = <T,>({
    data,
    renderItem,
    keyExtractor,
    activeIndex,
    reverse,
    onScroll,
    showsScrollIndicator,
    theme: themeOverrides,
    scrollResetKey,
    ...listProps
}: MenuProps<T>) => {
    const { styles, theme } = useComponent("menu", {
        themeOverrides,
        createStyles,
    });
    const { shadowStyle } = useSystems();
    const {
        listRef,
        isReady,
        initialScrollIndex,
        onContentSizeChange,
        onScrollToIndexFailed,
    } = useMenuScroll({
        data,
        activeIndex,
        scrollResetKey,
        getItemLayout: listProps.getItemLayout,
        onContentSizeChange: listProps.onContentSizeChange,
        gap: theme.gap,
    });

    return (
        <VirtualizedListContextResetter>
            <ScrollViewContextResetter>
                <View
                    style={[
                        styles.shadow,
                        shadowStyle,
                        !isReady && styles.hidden,
                    ]}
                >
                    <FlatList
                        {...listProps}
                        ref={listRef}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        inverted={reverse}
                        initialScrollIndex={initialScrollIndex}
                        onScroll={onScroll}
                        onContentSizeChange={onContentSizeChange}
                        onScrollToIndexFailed={onScrollToIndexFailed}
                        scrollEventThrottle={16}
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode="none"
                        showsVerticalScrollIndicator={showsScrollIndicator}
                        style={styles.container}
                        contentContainerStyle={styles.content}
                    />
                </View>
            </ScrollViewContextResetter>
        </VirtualizedListContextResetter>
    );
};

const createStyles = defineStyles((theme: MenuTheme) => ({
    shadow: {
        backgroundColor: theme.backgroundColor,
        borderRadius: theme.borderRadius,
    },
    container: {
        backgroundColor: theme.backgroundColor,
        borderRadius: theme.borderRadius,
        overflow: "hidden",
        pointerEvents: "auto",
        maxHeight: theme.maxHeight,
    },

    content: {
        padding: theme.padding,
        gap: theme.gap,
    },
    hidden: {
        opacity: 0,
        pointerEvents: "none",
    },
}));
