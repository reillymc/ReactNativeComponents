import type { FC, ReactNode } from "react";
import {
    Keyboard,
    Platform,
    Pressable,
    View,
    type ViewStyle,
} from "react-native";

export interface FormContainerProps {
    style?: ViewStyle;
    children?: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({ style, children }) =>
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
