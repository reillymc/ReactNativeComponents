import { useEffect, useRef, useState } from "react";
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
import { VirtualizedListContextResetter } from "./VirtualizedListContextResetter";

const VIEW_POSITION = 0.33;

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
    activeIndex,
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
    const { shadowStyle } = useSystems();
    const listRef = useRef<FlatList<T>>(null);
    const [isReady, setIsReady] = useState(
        activeIndex === undefined || activeIndex <= 0,
    );

    useEffect(() => {
        if (activeIndex === undefined || activeIndex < 0) return;

        listRef.current?.scrollToIndex({
            index: activeIndex,
            animated: true,
            viewPosition: VIEW_POSITION,
        });
    }, [activeIndex]);

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
                        onScroll={onScroll}
                        onContentSizeChange={() => {
                            if (activeIndex !== undefined && activeIndex >= 0) {
                                listRef.current?.scrollToIndex({
                                    index: activeIndex,
                                    animated: false,
                                    viewPosition: VIEW_POSITION,
                                });
                            }

                            if (!isReady) {
                                requestAnimationFrame(() => setIsReady(true));
                            }
                        }}
                        onScrollToIndexFailed={({
                            index,
                            averageItemLength,
                        }) => {
                            listRef.current?.scrollToOffset({
                                offset: averageItemLength * index,
                                animated: true,
                            });
                        }}
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
