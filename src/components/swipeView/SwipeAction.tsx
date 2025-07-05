import { StyleSheet } from "react-native";

import { IconButton, type IconButtonProps } from "../button";

export interface SwipeActionProps<G extends string, Fn extends string>
    extends Pick<
        IconButtonProps<G, Fn>,
        "iconSet" | "iconName" | "onPress" | "variant"
    > {}

export const SwipeAction = <G extends string, Fn extends string>(
    actionProps: SwipeActionProps<G, Fn>,
) => <IconButton {...actionProps} containerStyle={styles.actionButton} />;
const styles = StyleSheet.create({
    actionButton: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
        width: 75,
    },
});
