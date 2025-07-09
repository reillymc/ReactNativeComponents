import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

const isIos = Platform.OS === "ios";

export const usePersistentKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showEvent = isIos ? "keyboardWillShow" : "keyboardDidShow";

        const showListener = Keyboard.addListener(showEvent, (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        return () => {
            showListener.remove();
        };
    }, []);

    return { keyboardHeight };
};
