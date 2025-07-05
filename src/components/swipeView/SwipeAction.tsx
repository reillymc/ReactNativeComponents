import { StyleSheet } from "react-native";

import { IconAction, type IconActionProps } from "../action";

export interface SwipeActionProps<G extends string, Fn extends string>
    extends Pick<
        IconActionProps<G, Fn>,
        "label" | "iconSet" | "iconName" | "onPress" | "variant"
    > {}

export const SwipeAction = <G extends string, Fn extends string>(
    actionProps: SwipeActionProps<G, Fn>,
) => <IconAction {...actionProps} containerStyle={styles.actionButton} />;
const styles = StyleSheet.create({
    actionButton: {
        height: "100%",
        borderRadius: 0,
        width: 75,
    },
});
