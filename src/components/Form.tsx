import type { FC, ReactNode } from "react";
import {
    Keyboard,
    Platform,
    Pressable,
    View,
    type ViewStyle,
} from "react-native";

export interface FormProps {
    style?: ViewStyle;
    children?: ReactNode;
}

export const Form: FC<FormProps> = ({ style, children }) =>
    Platform.OS === "web" ? (
        <View style={style}>{children}</View>
    ) : (
        <Pressable
            accessible={false}
            style={style}
            onPress={() => Keyboard.dismiss()}
        >
            {children}
        </Pressable>
    );
