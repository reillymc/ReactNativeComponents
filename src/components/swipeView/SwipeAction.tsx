import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconButton, type IconButtonProps } from "../button";

export type SwipeActionStyles = {
    width: number;
};

export interface SwipeActionProps<G extends string, Fn extends string>
    extends Pick<
        IconButtonProps<G, Fn>,
        "iconSet" | "iconName" | "onPress" | "variant"
    > {}

export const SwipeAction = <G extends string, Fn extends string>(
    actionProps: SwipeActionProps<G, Fn>,
) => {
    const styles = useThemedStyles(createStyles, {});
    return <IconButton {...actionProps} containerStyle={styles.actionButton} />;
};

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
