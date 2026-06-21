import type { FC, ReactElement } from "react";
import { StyleSheet, View } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { Text } from "../text";

export interface ListItemRowProps {
    contentItems?: Array<ReactElement> | ReactElement;
}
export const ListItemRow: FC<ListItemRowProps> = ({ contentItems }) => {
    const [styles] = useThemedStyles("listItem", createStyles);

    const items = Array.isArray(contentItems) ? contentItems : [contentItems];

    return (
        <View style={styles.contentItem}>
            {items.map((item, index) => (
                <View key={item?.key} style={styles.contentItem}>
                    {item}
                    {index < items.length - 1 && (
                        <Text style={styles.spacer}>·</Text>
                    )}
                </View>
            ))}
        </View>
    );
};
const createStyles = ({ styles: { listItem } }: ThemedStyles) =>
    StyleSheet.create({
        contentItem: {
            flexDirection: "row",
            flexShrink: 1,
        },
        spacer: {
            marginHorizontal: listItem.contentItemSpacing,
        },
    });
