import React from "react";
import { Keyboard, Platform } from "react-native";

const isIOS = Platform.OS === "ios";

export const useKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    React.useEffect(() => {
        const showEvent = isIOS ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = isIOS ? "keyboardWillHide" : "keyboardDidHide";

        const showListener = Keyboard.addListener(showEvent, e => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hideListener = Keyboard.addListener(hideEvent, () => {
            setKeyboardHeight(0);
        });
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return { keyboardHeight };
};
