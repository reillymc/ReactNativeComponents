import type { FunctionComponent, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import Animated, {
    LinearTransition,
    SlideInDown,
    SlideOutDown,
} from "react-native-reanimated";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../../internal";

export interface ToastTheme {
    container: {
        backgroundColor: ColorValue;
        padding: number;
        borderRadius: number;
    };
    borderColor: ColorValue;
    borderWidth: number;
    separatorColor: ColorValue;
    separatorMarginHorizontal: number;
}
export interface ToastProps {
    action?: ReactNode;
    theme?: DeepPartial<ToastTheme>;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

const TOAST_ENTERING = SlideInDown.springify().mass(0.5);
const TOAST_EXITING = SlideOutDown.springify().mass(0.5);
const TOAST_LAYOUT = LinearTransition.springify().mass(0.5);

export const Toast: FunctionComponent<ToastProps> = ({
    action,
    theme: themeOverrides,
    style,
    children,
}) => {
    const { styles } = useComponent("toast", {
        themeOverrides,
        createStyles,
    });

    return (
        <Animated.View
            style={[styles.container, style]}
            entering={TOAST_ENTERING}
            exiting={TOAST_EXITING}
            layout={TOAST_LAYOUT}
        >
            <View style={styles.innerContainer}>
                <View style={styles.contentContainer}>{children}</View>
                {action && (
                    <View style={styles.actionContainer}>
                        <Animated.View
                            layout={TOAST_LAYOUT}
                            style={styles.separator}
                        />
                        {action}
                    </View>
                )}
            </View>
        </Animated.View>
    );
};

const createStyles = defineStyles((theme: ToastTheme) => ({
    container: {
        backgroundColor: theme.container.backgroundColor,
        padding: theme.container.padding,
        borderRadius: theme.container.borderRadius,
        borderWidth: theme.borderWidth,
        borderColor: theme.borderColor,
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentContainer: {
        flex: 1,
    },
    actionContainer: {
        flex: 0,
        alignItems: "center",
        flexDirection: "row",
        height: "100%",
    },
    separator: {
        borderStartWidth: theme.borderWidth,
        borderStartColor: theme.separatorColor,
        height: "100%",
        marginHorizontal: theme.separatorMarginHorizontal,
    },
}));
