import { IconButton, type IconButtonProps } from "../button";
import type { IconComponentProps } from "../icon";
import { defineStyles, useComponent } from "../shared";

export type SwipeActionTheme = {
    width: number;
};

export interface SwipeActionProps
    extends Pick<IconButtonProps, "onPress" | "variant"> {}

export const SwipeAction = <G extends string>(
    props: SwipeActionProps & IconComponentProps<G>,
) => {
    const { styles } = useComponent("swipeAction", { createStyles });
    return (
        <IconButton
            {...props}
            appearance="prominent"
            style={styles.actionButton}
        />
    );
};

const createStyles = defineStyles((theme: SwipeActionTheme) => ({
    actionButton: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
        width: theme.width,
    },
}));
