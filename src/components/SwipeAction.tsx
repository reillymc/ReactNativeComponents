import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../hooks";
import { IconButton, type IconButtonProps } from "./button";
import { withIcon } from "./icon";

export type SwipeActionStyles = {
    width: number;
};

export interface SwipeActionProps
    extends Pick<IconButtonProps, "onPress" | "variant"> {}

export const SwipeAction = withIcon<SwipeActionProps>((props) => {
    const [styles] = useThemedStyles("swipeAction", createStyles);
    return <IconButton {...props} containerStyle={styles.actionButton} />;
});

const createStyles = ({ styles: { swipeAction } }: ThemedStyles) =>
    StyleSheet.create({
        actionButton: {
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 0,
            width: swipeAction.width,
        },
    });
