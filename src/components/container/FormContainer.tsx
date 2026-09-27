import type { FC, ReactNode } from "react";
import {
    Keyboard,
    Platform,
    Pressable,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";

import { useTheme } from "../../hooks";

export interface FormContainerProps {
    /**
     * Vertical gap between fields. Defaults to `spacing.medium`.
     */
    gap?: number;

    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({
    style,
    gap,
    children,
}) => {
    const {
        theme: { spacing },
    } = useTheme();

    const containerStyle = [
        styles.container,
        { gap: gap ?? spacing.medium },
        style,
    ];

    return Platform.OS === "web" ? (
        <View style={containerStyle}>{children}</View>
    ) : (
        <Pressable
            accessible={false}
            style={containerStyle}
            onPress={() => Keyboard.dismiss()}
        >
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        width: "100%",
        minWidth: 0,
    },
});
