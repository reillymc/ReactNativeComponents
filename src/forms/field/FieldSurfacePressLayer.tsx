import { type FC, useRef } from "react";
import { StyleSheet, type View } from "react-native";

import { PressableBase } from "../../actions/action";
import { StateLayer } from "../../actions/surface";
import { defineStyles, useComponent } from "../../internal";
import { fieldAria } from "./a11y";
import type { FieldTheme } from "./Field.theme";
import { useFieldControlState } from "./FieldContext";
import { useFieldControlFocus } from "./useFieldControlFocus";

export type FieldSurfacePressLayerProps = {
    onPress: () => void;
};

/**
 * Full-surface press/focus target that renders press and hover state.
 *
 * Should be used when a input behaves as an action / trigger.
 */
export const FieldSurfacePressLayer: FC<FieldSurfacePressLayerProps> = ({
    onPress,
}) => {
    const { field } = useFieldControlState();
    const { styles } = useComponent("field", { createStyles });
    const pressRef = useRef<View>(null);
    const focusPress = () => pressRef.current?.focus?.();

    const { getFocusProps } = useFieldControlFocus({
        focus: focusPress,
        pressEvents: true,
    });

    return (
        <PressableBase
            ref={pressRef}
            {...getFocusProps()}
            focusable
            tabIndex={0}
            accessibilityRole="button"
            {...fieldAria(field)}
            onPress={onPress}
            style={[StyleSheet.absoluteFill, styles.pressable]}
        >
            {({ pressed, hovered }) => (
                <StateLayer pressed={pressed} hovered={hovered} />
            )}
        </PressableBase>
    );
};

const createStyles = defineStyles((theme: FieldTheme) => ({
    pressable: {
        borderRadius: theme.surface.borderRadius,
        overflow: "hidden",
    },
}));
