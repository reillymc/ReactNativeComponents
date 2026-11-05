import { useCallback, useEffect, useRef, useState } from "react";
import type { FlatList, FlatListProps } from "react-native";

const VIEW_POSITION = 0.33;

type MenuScrollOptions<T> = {
    data: ReadonlyArray<T>;
    activeIndex?: number;
    scrollResetKey?: string | number;
    getItemLayout?: FlatListProps<T>["getItemLayout"];
    onContentSizeChange?: FlatListProps<T>["onContentSizeChange"];
    gap: number;
};

export const useMenuScroll = <T>({
    data,
    activeIndex,
    scrollResetKey,
    getItemLayout,
    onContentSizeChange,
    gap,
}: MenuScrollOptions<T>) => {
    const listRef = useRef<FlatList<T>>(null);
    const hasActiveIndex =
        activeIndex !== undefined &&
        activeIndex >= 0 &&
        activeIndex < data.length;
    const hasItemLayout = getItemLayout !== undefined;
    const activeItemLength = hasActiveIndex
        ? getItemLayout?.(data, activeIndex)?.length
        : undefined;

    const [isReady, setIsReady] = useState(
        !hasActiveIndex || activeIndex === 0,
    );
    const hasPositionedRef = useRef(false);
    const scrollResetKeyRef = useRef(scrollResetKey);
    const [initialScrollIndex] = useState<number | undefined>(() =>
        hasItemLayout && hasActiveIndex && activeIndex > 0
            ? activeIndex - 1
            : undefined,
    );

    const scrollToActive = useCallback(
        (animated: boolean) => {
            if (!hasActiveIndex) return;

            listRef.current?.scrollToIndex({
                index: activeIndex,
                animated,
                ...(activeItemLength === undefined
                    ? { viewPosition: VIEW_POSITION }
                    : {
                          viewPosition: 0,
                          viewOffset: activeItemLength + gap,
                      }),
            });
        },
        [activeIndex, activeItemLength, hasActiveIndex, gap],
    );

    const positionFirst = useCallback(() => {
        hasPositionedRef.current = true;
        scrollResetKeyRef.current = scrollResetKey;
        scrollToActive(false);
    }, [scrollResetKey, scrollToActive]);

    useEffect(() => {
        if (!hasActiveIndex) return;

        const isFirstPosition = !hasPositionedRef.current;
        if (isFirstPosition && !hasItemLayout) return;

        if (isFirstPosition) {
            positionFirst();
        } else {
            const isReset = scrollResetKeyRef.current !== scrollResetKey;
            scrollResetKeyRef.current = scrollResetKey;
            scrollToActive(!isReset);
        }

        setIsReady(true);
    }, [
        hasActiveIndex,
        hasItemLayout,
        scrollResetKey,
        positionFirst,
        scrollToActive,
    ]);

    const handleContentSizeChange = useCallback<
        NonNullable<FlatListProps<T>["onContentSizeChange"]>
    >(
        (width, height) => {
            if (!hasPositionedRef.current) {
                positionFirst();
                requestAnimationFrame(() => setIsReady(true));
            }

            onContentSizeChange?.(width, height);
        },
        [onContentSizeChange, positionFirst],
    );

    const handleScrollToIndexFailed = useCallback<
        NonNullable<FlatListProps<T>["onScrollToIndexFailed"]>
    >(
        ({ index, averageItemLength }) => {
            if (index !== activeIndex) return;

            listRef.current?.scrollToOffset({
                offset: averageItemLength > 0 ? averageItemLength * index : 0,
                animated: false,
            });
        },
        [activeIndex],
    );

    return {
        listRef,
        isReady,
        initialScrollIndex,
        onContentSizeChange: handleContentSizeChange,
        onScrollToIndexFailed: handleScrollToIndexFailed,
    };
};
