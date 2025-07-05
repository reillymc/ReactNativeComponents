import type { FC, ReactNode } from "react";
import {
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
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
        <TouchableWithoutFeedback
            accessible={false}
            style={style}
            onPress={() => Keyboard.dismiss()}
        >
            {children}
        </TouchableWithoutFeedback>
    );
