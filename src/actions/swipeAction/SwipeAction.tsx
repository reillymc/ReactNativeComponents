import type { DeepPartial } from "@reillymc/es-utils";

import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import {
    IconButton,
    type IconButtonProps,
    type IconButtonTheme,
} from "../button";

export type SwipeActionTheme = {
    container: {
        width: number;
        borderRadius: number;
    };
    button: IconButtonTheme;
};

export interface SwipeActionProps
    extends Pick<IconButtonProps, "onPress" | "variant"> {
    theme?: DeepPartial<SwipeActionTheme>;
}

export const SwipeAction = <G extends string>({
    theme: themeOverrides,
    ...props
}: SwipeActionProps & IconComponentProps<G>) => {
    const { styles, theme } = useComponent("swipeAction", {
        themeOverrides,
        createStyles,
    });

    return (
        <IconButton
            {...props}
            theme={theme.button}
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
        borderRadius: theme.container.borderRadius,
        width: theme.container.width,
    },
}));
