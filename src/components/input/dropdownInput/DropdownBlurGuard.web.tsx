import type { PropsWithChildren } from "react";
import { View } from "react-native";

type MouseDownEvent = { preventDefault: () => void };

const preventBlur = {
    onMouseDown: (event: MouseDownEvent) => {
        event.preventDefault();
    },
};

/**
 * Prevents the input from losing focus when interacting with the dropdown.
 * Cancels the default `mousedown` behaviour (which would blur the input and
 * unmount the dropdown before the click lands) so a click on a menu item can
 * complete.
 */
export const DropdownBlurGuard = ({ children }: PropsWithChildren) => (
    <View {...preventBlur}>{children}</View>
);
