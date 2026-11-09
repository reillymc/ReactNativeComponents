import type { FunctionComponent, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent } from "../../internal";
import { useSystems } from "../../theme/useSystems";

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
    const { shadowStyle } = useSystems();

    return (
        <View style={[styles.container, shadowStyle, style, styles.row]}>
            <View style={styles.content}>{children}</View>
            {!!action && <View style={styles.action}>{action}</View>}
        </View>
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
    row: {
        flexDirection: "row",
    },
    content: {
        flex: 1,
    },
    action: {
        alignItems: "center",
        alignSelf: "stretch",
        borderStartColor: theme.separatorColor,
        borderStartWidth: theme.borderWidth,
        flexDirection: "row",
        marginStart: theme.separatorMarginHorizontal,
        paddingStart: theme.separatorMarginHorizontal,
    },
}));
