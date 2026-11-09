import type { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export interface ListItemAlertProps {
    children?: ReactNode;
}

export const ListItemAlert: FC<ListItemAlertProps> = ({ children }) => {
    const [styles] = useThemedStyles("listItem", createStyles);

    return <View style={styles.alert}>{children}</View>;
};

const createStyles = ({ styles: { listItem } }: ThemedStyles) =>
    StyleSheet.create({
        alert: {
            alignItems: "center",
            justifyContent: "center",
            marginStart: listItem.spacingMargin,
            marginEnd: listItem.internalSpacing,
        },
    });
