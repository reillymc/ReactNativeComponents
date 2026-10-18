import { type FC, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import type { ValueItem } from "@reillymc/react-native-components/common";
import {
    Action,
    MenuItem,
    Tag,
    TagIcon,
    Text,
} from "@reillymc/react-native-components/components";
import { useThemedStyles } from "@reillymc/react-native-components/hooks";

import {
    type SelectionRequest,
    useSelectionModalController,
} from "../demo/components/SelectionModalContext";
import type { AppThemedStyles } from "../demo/theme";

type ModalItem = ValueItem & { id?: string };

const SelectionModalContent: FC<{ request: SelectionRequest }> = ({
    request,
}) => {
    const styles = useThemedStyles(createStyles);
    const router = useRouter();

    const [selectedItems, setSelectedItems] = useState<ModalItem[]>(
        request.selection,
    );

    const closeWithSelection = (selection: ModalItem[]) => {
        request.resolve(selection);
        router.back();
    };

    const handleItemPress = (item: ModalItem) => {
        if (request.selectionMode === "single") {
            closeWithSelection([item]);
            return;
        }

        setSelectedItems((previous) =>
            previous.some((selected) => selected.value === item.value)
                ? previous.filter((selected) => selected.value !== item.value)
                : [...previous, item],
        );
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: request.label,
                    headerLargeTitle: false,
                    headerRight: () => (
                        <Action
                            label="Done"
                            containerStyle={styles.headerAction}
                            onPress={() =>
                                closeWithSelection(
                                    request.selectionMode === "single"
                                        ? selectedItems.slice(0, 1)
                                        : selectedItems,
                                )
                            }
                        />
                    ),
                }}
            />
            <FlatList
                data={request.items}
                contentInsetAdjustmentBehavior="always"
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    request.selectionMode === "multi" ? (
                        <View style={styles.selectionDisplay}>
                            {!!selectedItems.length && (
                                <View style={styles.clearButton}>
                                    <Action
                                        label="Clear"
                                        onPress={() => setSelectedItems([])}
                                    />
                                </View>
                            )}
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) =>
                                    item.id ?? item.value.toString()
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
                                        {request.placeholder}
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

const SelectionModal: FC = () => {
    const { request } = useSelectionModalController();

    if (!request) return null;

    return <SelectionModalContent key={request.key} request={request} />;
};

export default SelectionModal;

const createStyles = ({
    styles: { inputBase },
    theme: { spacing, color },
}: AppThemedStyles) => {
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
