import type { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export interface ListItemAvatarProps {
    children?: ReactNode;
}

export const ListItemAvatar: FC<ListItemAvatarProps> = ({ children }) => {
    const [styles] = useThemedStyles("listItem", createStyles);

    return <View style={styles.avatar}>{children}</View>;
};

const createStyles = ({ styles: { listItem } }: ThemedStyles) =>
    StyleSheet.create({
        avatar: {
            alignItems: "center",
            justifyContent: "center",
            marginLeft: listItem.internalSpacing,
        },
    });
