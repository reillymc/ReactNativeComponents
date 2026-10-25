import type { FC, ReactNode } from "react";
import { View } from "react-native";

import { defineStyles, useComponent } from "../shared";
import type { ListItemTheme } from "./ListItem";

export interface ListItemAvatarProps {
    children?: ReactNode;
}

export const ListItemAvatar: FC<ListItemAvatarProps> = ({ children }) => {
    const { styles } = useComponent("listItem", { createStyles });

    return <View style={styles.avatar}>{children}</View>;
};

const createStyles = defineStyles((theme: ListItemTheme) => ({
    avatar: {
        alignItems: "center",
        justifyContent: "center",
        marginStart: theme.internalSpacing,
    },
}));
