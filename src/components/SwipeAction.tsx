import { StyleSheet } from "react-native";

import { type ThemedStyles, useStyles } from "../hooks";
import { IconButton, type IconButtonProps } from "./button";
import { componentWithIcon } from "./icon";

export type SwipeActionStyles = {
    width: number;
};

export interface SwipeActionProps
    extends Pick<IconButtonProps, "onPress" | "variant"> {}

export const SwipeAction = componentWithIcon<SwipeActionProps>((props) => {
    const [styles] = useStyles("swipeAction", createStyles, {});
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
