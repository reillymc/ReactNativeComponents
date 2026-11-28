import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

type MouseDownEvent = { preventDefault: () => void };

const preventBlur = {
    onMouseDown: (event: MouseDownEvent) => {
        event.preventDefault();
    },
};

/**
 * Prevents pointer interaction with the content from moving focus away from
 * the currently focused element.
 *
 * Cancels the default `mousedown` behaviour, which would otherwise focus the
 * pressed element and blur an input.
 */
export const FocusBlurGuard = ({ children }: PropsWithChildren) => (
    <View {...preventBlur} style={styles.container}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: "contents",
    },
});
