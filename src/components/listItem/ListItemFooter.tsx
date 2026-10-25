import type { FC, ReactNode } from "react";
import { View } from "react-native";

import { defineStyles, useComponent } from "../shared";
import type { ListItemTheme } from "./ListItem";

export interface ListItemFooterProps {
    children?: ReactNode;
}

export const ListItemFooter: FC<ListItemFooterProps> = ({ children }) => {
    const { styles } = useComponent("listItem", { createStyles });

    return <View style={styles.footer}>{children}</View>;
};
const createStyles = defineStyles((theme: ListItemTheme) => ({
    footer: {
        display: "flex",
        marginBottom: theme.internalSpacing,
        marginStart: theme.internalSpacing,
        marginEnd: theme.internalSpacing,
    },
}));
