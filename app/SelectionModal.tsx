/** biome-ignore-all lint/correctness/useExhaustiveDependencies: TODO: some specific behaviour is required, revisit later to fix */
import { type FC, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import type { ValueItem } from "@reillymc/react-native-components/common";
import {
    Action,
    MenuItem,
    Tag,
    TagIcon,
    Text,
} from "@reillymc/react-native-components/components";
import {
    type ThemedStyles,
    useThemedStyles,
} from "@reillymc/react-native-components/hooks";

const SelectionModal: FC = () => {
    const styles = useThemedStyles(createStyles);
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
                                        icon={
                                            <TagIcon
                                                iconSet={Octicons}
                                                iconName="x-circle"
                                            />
                                        }
                                        onPress={() => handleItemPress(item)}
                                    />
                                )}
                            />
                        </View>
                    ) : null
                }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <MenuItem
                            key={"id" in item ? item.id : item.value}
                            label={item.label}
                            description={item.description}
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
    styles: { inputBase },
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
            paddingLeft: inputBase.container.padding,
            paddingVertical: spacing.tiny,
            height: 48,
        },
        previewPlaceholder: {
            alignSelf: "center",
            paddingLeft: inputBase.container.padding,
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
