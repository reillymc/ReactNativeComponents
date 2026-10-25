import type { FC, ReactElement } from "react";
import { View } from "react-native";
import { Undefined } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../shared";
import { Text } from "../text";
import type { ListItemTheme } from "./ListItem";

export interface ListItemRowProps {
    contentItems?: Array<ReactElement> | ReactElement;
}
export const ListItemRow: FC<ListItemRowProps> = ({ contentItems }) => {
    const { styles } = useComponent("listItem", { createStyles });

    const items = (
        Array.isArray(contentItems) ? contentItems : [contentItems]
    ).filter(Undefined);

    return (
        <View style={styles.contentItem}>
            {items.map((item, index) => (
                <View
                    key={item.key ?? `content-item-${index}`}
                    style={styles.contentItem}
                >
                    {item}
                    {index < items.length - 1 && (
                        <Text style={styles.spacer}>·</Text>
                    )}
                </View>
            ))}
        </View>
    );
};
const createStyles = defineStyles((theme: ListItemTheme) => ({
    contentItem: {
        flexDirection: "row",
        flexShrink: 1,
    },
    spacer: {
        marginHorizontal: theme.contentItemSpacing,
    },
}));
