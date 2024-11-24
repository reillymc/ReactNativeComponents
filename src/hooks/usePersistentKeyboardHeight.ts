import React from "react";
import { Keyboard, Platform } from "react-native";

const isIOS = Platform.OS === "ios";

export const usePersistentKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);

    React.useEffect(() => {
        const showEvent = isIOS ? "keyboardWillShow" : "keyboardDidShow";

        const showListener = Keyboard.addListener(showEvent, e => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        return () => {
            showListener.remove();
        };
    }, []);

    return { keyboardHeight };
};
