import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

const isIos = Platform.OS === "ios";

const showEvent = isIos ? "keyboardWillShow" : "keyboardDidShow";
const hideEvent = "keyboardDidHide";

export const usePersistentKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showListener = Keyboard.addListener(showEvent, (e) => {
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
