import { type FC, useState } from "react";
import { FlatList, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import Octicons from "@react-native-vector-icons/octicons";
import { Action } from "@reillymc/react-native-components/actions";
import { Tag, TagIcon } from "@reillymc/react-native-components/display";
import type { ValueItem } from "@reillymc/react-native-components/forms";
import { MenuItem } from "@reillymc/react-native-components/overlays";
import { Text } from "@reillymc/react-native-components/typography";

import {
    type SelectionRequest,
    useSelectionModalController,
} from "../demo/components/SelectionModalContext";
import { defineStyles, useStyles } from "../demo/theme";

type ModalItem = ValueItem & { id?: string };

const SelectionModalContent: FC<{ request: SelectionRequest }> = ({
    request,
}) => {
    const styles = useStyles(createStyles);
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
                                        tone="light"
                                        icon={
                                            <TagIcon
                                                iconSet={Octicons}
                                                iconName="x-circle"
                                                tone="light"
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

const createStyles = defineStyles(({ palette, theme, appTheme }) => ({
    list: {
        paddingBottom: appTheme.page.bottom,
    },
    tag: {
        marginVertical: 2,
    },
    item: {
        paddingHorizontal: palette.spacing.small,
    },
    selectionDisplay: {
        flexDirection: "row",
        marginTop: palette.spacing.tiny,
        marginBottom: palette.spacing.medium,
        overflow: "hidden",
    },
    previewTagContainer: {
        paddingLeft: theme.inputBase.container.padding,
        paddingVertical: palette.spacing.tiny,
        height: 48,
    },
    previewPlaceholder: {
        alignSelf: "center",
        paddingLeft: theme.inputBase.container.padding,
    },
    clearButton: {
        paddingHorizontal: palette.spacing.medium,
        marginVertical: palette.spacing.tiny + 2,
        borderRightColor: palette.color.border,
        borderRightWidth: 1,
        justifyContent: "center",
    },
}));
