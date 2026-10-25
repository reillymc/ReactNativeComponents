import type { FC, ReactNode } from "react";
import { View } from "react-native";

import { defineStyles, useComponent } from "../shared";
import type { ListItemTheme } from "./ListItem";

export interface ListItemAlertProps {
    children?: ReactNode;
}

export const ListItemAlert: FC<ListItemAlertProps> = ({ children }) => {
    const { styles } = useComponent("listItem", { createStyles });

    return <View style={styles.alert}>{children}</View>;
};

const createStyles = defineStyles((theme: ListItemTheme) => ({
    alert: {
        alignItems: "center",
        justifyContent: "center",
        marginStart: theme.spacingMargin,
        marginEnd: theme.internalSpacing,
    },
}));
