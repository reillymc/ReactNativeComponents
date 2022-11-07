import React from "react";
import { Keyboard, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

export interface FormProps {
    style?: ViewStyle;
    children?: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ style, children }) => (
    <TouchableWithoutFeedback accessible={false} onPress={() => Keyboard.dismiss()}>
        <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
);
