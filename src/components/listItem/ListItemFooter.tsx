import type { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export interface ListItemFooterProps {
    children?: ReactNode;
}

export const ListItemFooter: FC<ListItemFooterProps> = ({ children }) => {
    const [styles] = useThemedStyles("listItem", createStyles);

    return <View style={styles.footer}>{children}</View>;
};
const createStyles = ({ styles: { listItem } }: ThemedStyles) =>
    StyleSheet.create({
        footer: {
            display: "flex",
            marginBottom: listItem.internalSpacing,
            marginLeft: listItem.internalSpacing,
            marginRight: listItem.internalSpacing,
        },
    });
