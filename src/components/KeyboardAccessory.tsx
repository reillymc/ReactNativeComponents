import React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    KeyboardEvent,
    LayoutAnimation,
    LayoutAnimationType,
    Platform,
} from "react-native";

export interface KeyboardAccessoryProps {
    alwaysVisible?: boolean;
    renderChildren?: (props: { keyboardVisible: boolean }) => React.ReactNode;
}

const accessoryAnimation = (duration: number, easing: LayoutAnimationType) => {
    if (Platform.OS === "android") {
        return {
            duration: 200,
            create: {
                duration: 200,
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear,
            },
        };
    }

    return LayoutAnimation.create(duration, LayoutAnimation.Types[easing], LayoutAnimation.Properties.opacity);
};

export const KeyboardAccessory: React.FunctionComponent<KeyboardAccessoryProps> = ({
    alwaysVisible,
    renderChildren,
}) => {
    const [keyboardVisible, setKeyboardVisible] = React.useState(false);

    const handleKeyboardShow = React.useCallback((keyboardEvent: KeyboardEvent) => {
        if (!keyboardEvent.endCoordinates) {
            return;
        }

        const keyboardAnimate = () => {
            LayoutAnimation.configureNext(accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing));

            setKeyboardVisible(true);
        };

        keyboardAnimate();
    }, []);

    const handleKeyboardHide = React.useCallback((keyboardEvent: KeyboardEvent) => {
        LayoutAnimation.configureNext(accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing));

        setKeyboardVisible(false);
    }, []);

    React.useEffect(() => {
        const showListener = Keyboard.addListener("keyboardWillShow", handleKeyboardShow);

        const hideListener = Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, [handleKeyboardShow, handleKeyboardHide]);

    return (
        <KeyboardAvoidingView behavior="padding">
            {(!alwaysVisible && !keyboardVisible) || renderChildren?.({ keyboardVisible: keyboardVisible })}
        </KeyboardAvoidingView>
    );
};

KeyboardAccessory.displayName = "KeyboardAccessory";
