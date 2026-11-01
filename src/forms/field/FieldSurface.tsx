import { type FC, type ReactNode, type Ref, useState } from "react";
import {
    Platform,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";

import { defineStyles, useComponent } from "../../internal";
import { useSystems } from "../../theme/useSystems";
import type { FieldTheme, InputVariant } from "./Field.theme";
import { useFieldControlState } from "./FieldContext";
import { FieldSurfaceContext } from "./FieldSurfaceContext";
import { FieldSurfacePressLayer } from "./FieldSurfacePressLayer";

export type FieldSurfaceProps = {
    onPress?: () => void;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    ref?: Ref<View>;
};

/**
 * Visible field styling layer.
 *
 * Should be used for any form input that requires standard input background and
 * visual cues.
 */
export const FieldSurface: FC<FieldSurfaceProps> = ({
    onPress,
    children,
    ref,
    style,
}) => {
    const { interactive, disabled, invalid, variant } = useFieldControlState();
    const { getFocusRingStyle, getDisabledStyle } = useSystems();
    const { styles } = useComponent("field", {
        props: { invalid, variant },
        createStyles,
    });

    const [focusedSlots, setFocusedSlots] = useState<ReadonlySet<symbol>>(
        () => new Set(),
    );
    const reportFocus = (id: symbol, focusVisible: boolean) => {
        setFocusedSlots((current) => {
            const hasFocus = current.has(id);

            if (focusVisible === hasFocus) return current;

            const next = new Set(current);

            if (focusVisible) {
                next.add(id);
            } else {
                next.delete(id);
            }

            return next;
        });
    };

    const canPress = interactive && !!onPress;
    const showRing =
        Platform.OS === "web" && !disabled && focusedSlots.size > 0;
    const focusRingStyle = getFocusRingStyle(showRing);
    const disabledStyle = getDisabledStyle(disabled);

    return (
        <View
            ref={ref}
            collapsable={ref ? false : undefined}
            style={[styles.control, focusRingStyle, disabledStyle, style]}
        >
            <View style={[StyleSheet.absoluteFill, styles.surface]} />
            <FieldSurfaceContext.Provider value={{ reportFocus }}>
                {canPress && onPress && (
                    <FieldSurfacePressLayer onPress={onPress} />
                )}
                <View
                    style={[
                        styles.content,
                        styles.pointerEventsAuto,
                        canPress && styles.pointerEventsBoxNone,
                        disabled && styles.pointerEventsNone,
                    ]}
                >
                    {children}
                </View>
            </FieldSurfaceContext.Provider>
        </View>
    );
};

const createStyles = defineStyles(
    (theme: FieldTheme, props: { invalid: boolean; variant: InputVariant }) => {
        const { surface } = theme;

        return {
            control: {
                alignSelf: "stretch",
                minWidth: 0,
                minHeight: surface.minHeight[props.variant],
                borderRadius: surface.borderRadius,
                position: "relative",
            },
            surface: {
                backgroundColor: surface.backgroundColor,
                borderColor: props.invalid
                    ? surface.errorBorderColor
                    : surface.borderColor,
                borderWidth: surface.borderWidth,
                borderRadius: surface.borderRadius,
            },
            content: {
                position: "relative",
                zIndex: 1,
                flexGrow: 1,
                minWidth: 0,
                minHeight: surface.minHeight[props.variant],
            },
            pointerEventsAuto: {
                pointerEvents: "auto",
            },
            pointerEventsNone: {
                pointerEvents: "none",
            },
            pointerEventsBoxNone: {
                pointerEvents: "box-none",
            },
        };
    },
);
