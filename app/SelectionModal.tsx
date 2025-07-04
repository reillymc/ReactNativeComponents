import { type FC, useCallback, useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import {
    Action,
    DropdownItem,
    type SelectionInputProps,
    Tag,
    Text,
    type ThemedStyles,
    useThemedStyles,
    type ValueItem,
} from "@reillymc/react-native-components";

type UseSelectionModalParams<T> = Pick<
    SelectionInputProps<T>,
    "selectionMode" | "items"
> & {
    key: string;
    label: string;
    placeholder?: string;
    initialSelection?: ValueItem<T>[];
};

export const useSelectionModal = <T,>({
    key,
    initialSelection,
    label,
    items,
    placeholder,
    selectionMode,
}: UseSelectionModalParams<T>) => {
    const router = useRouter();

    const { key: _, selection: selectionParam } = useGlobalSearchParams();

    // TODO: investigate issues with params not updating when expected
    const isActive = true; //useMemo(() => key === keyParam, [key, keyParam]);

    const selectedItemsFromParams = useMemo(() => {
        if (
            !(isActive && selectionParam) ||
            selectionParam === "undefined" ||
            Array.isArray(selectionParam)
        )
            return;

        return JSON.parse(selectionParam) as Array<ValueItem<T>>;
    }, [isActive, selectionParam]);

    const selectedWithInitial = useMemo(
        () => selectedItemsFromParams ?? initialSelection ?? [],
        [selectedItemsFromParams, initialSelection],
    );

    const stringItems = useMemo(() => JSON.stringify(items), [items]);
    const stringSelectedWithInitial = useMemo(
        () =>
            selectedWithInitial
                ? JSON.stringify(selectedWithInitial)
                : undefined,
        [selectedWithInitial],
    );

    useEffect(() => {
        if (!isActive) return;

        router.setParams({
            key,
            selectionMode: selectionMode,
            label,
            placeholder,
            items: stringItems,
            selection: stringSelectedWithInitial,
        });
    }, [
        isActive,
        stringItems,
        stringSelectedWithInitial,
        key,
        label,
        placeholder,
        router,
        selectionMode,
    ]);

    const openSelectionModal = useCallback(() => {
        router.push({
            pathname: "/SelectionModal",
            params: {
                key,
                selectionMode: selectionMode,
                label,
                placeholder,
                items: stringItems,
                selection: stringSelectedWithInitial,
            },
        });
    }, [
        stringItems,
        key,
        label,
        placeholder,
        stringSelectedWithInitial,
        router,
        selectionMode,
    ]);

    return {
        selectedItems: selectedWithInitial,
        openSelectionModal,
    };
};

const SelectionModal: FC = () => {
    const styles = useThemedStyles(createStyles, {});
    const router = useRouter();

    const {
        items: rawItems,
        selection: rawSelection,
        selectionMode: rawSelectionMode,
        label,
        placeholder = "Select items",
    } = useGlobalSearchParams();

    const items = useMemo(() => {
        if (!rawItems || rawItems === "undefined" || Array.isArray(rawItems))
            return;

        return JSON.parse(rawItems);
    }, [rawItems]) as Array<ValueItem & { id?: string }>;

    const selectedItems = useMemo(() => {
        if (
            !rawSelection ||
            rawSelection === "undefined" ||
            Array.isArray(rawSelection)
        )
            return [];

        return JSON.parse(rawSelection) as Array<
            ValueItem | ValueItem<unknown>
        >;
    }, [rawSelection]);

    const selectionMode = useMemo(() => {
        switch (rawSelectionMode) {
            case "multi":
            case "single":
                return rawSelectionMode;
            default:
                return "single";
        }
    }, [rawSelectionMode]);

    const handleItemPress = useCallback(
        (item: ValueItem | ValueItem<unknown>) => {
            router.setParams({
                selection: JSON.stringify([item]),
            });

            if (selectionMode === "single") {
                setTimeout(router.back, 1);
            }
        },
        [router, selectionMode, selectedItems],
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: label as string,
                    headerLargeTitle: false,
                    headerRight: () => (
                        <Action
                            label="Done"
                            containerStyle={styles.headerAction}
                            onPress={() => router.back()}
                        />
                    ),
                }}
            />
            <FlatList
                data={items}
                contentInsetAdjustmentBehavior="always"
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    selectionMode === "multi" ? (
                        <View style={styles.selectionDisplay}>
                            {!!selectedItems.length && (
                                <View style={styles.clearButton}>
                                    <Action
                                        label="Clear"
                                        onPress={() =>
                                            router.setParams({
                                                selection: JSON.stringify([]),
                                            })
                                        }
                                    />
                                </View>
                            )}
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) =>
                                    "id" in item
                                        ? item.id
                                        : item.value.toString()
                                }
                                data={selectedItems}
                                contentContainerStyle={
                                    styles.previewTagContainer
                                }
                                ListEmptyComponent={
                                    <Text
                                        variant="caption"
                                        style={styles.previewPlaceholder}
                                    >
                                        {placeholder}
                                    </Text>
                                }
                                renderItem={({ item }) => (
                                    <Tag
                                        label={item.label}
                                        style={styles.tag}
                                        variant="light"
                                        iconName="closecircle"
                                        onPress={() => handleItemPress(item)}
                                    />
                                )}
                            />
                        </View>
                    ) : null
                }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <DropdownItem
                            key={"id" in item ? item.id : item.value}
                            item={item}
                            searchValue={
                                selectedItems.find(
                                    (selectedItem) =>
                                        selectedItem.value === item.value,
                                )?.label
                            }
                            onPress={() => handleItemPress(item)}
                        />
                    </View>
                )}
            />
        </>
    );
};

export default SelectionModal;

const createStyles = ({
    styles: { baseInput },
    theme: { spacing, color },
}: ThemedStyles) => {
    const styles = StyleSheet.create({
        headerAction: {
            marginHorizontal: spacing.navigationActionHorizontal,
        },
        list: {
            paddingBottom: spacing.pageBottom,
        },
        tag: {
            marginVertical: 2,
        },
        item: {
            paddingHorizontal: spacing.small,
        },
        selectionDisplay: {
            flexDirection: "row",
            marginTop: spacing.tiny,
            marginBottom: spacing.medium,
            overflow: "hidden",
        },
        previewTagContainer: {
            paddingLeft: baseInput.padding,
            paddingVertical: spacing.tiny,
            height: 48,
        },
        previewPlaceholder: {
            alignSelf: "center",
            paddingLeft: baseInput.padding,
        },
        clearButton: {
            paddingHorizontal: spacing.medium,
            marginVertical: spacing.tiny + 2,
            borderRightColor: color.border,
            borderRightWidth: 1,
            justifyContent: "center",
        },
    });
    return styles;
};
