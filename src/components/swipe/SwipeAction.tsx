import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconButton, type IconButtonProps } from "../button";
import type { IconComponentProps } from "../icon";

export type SwipeActionStyles = {
    width: number;
};

export interface SwipeActionProps
    extends Pick<IconButtonProps, "onPress" | "variant"> {}

export const SwipeAction = <G extends string>(
    props: SwipeActionProps & IconComponentProps<G>,
) => {
    const [styles] = useThemedStyles("swipeAction", createStyles);
    return (
        <IconButton
            {...props}
            appearance="prominent"
            containerStyle={styles.actionButton}
        />
    );
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
