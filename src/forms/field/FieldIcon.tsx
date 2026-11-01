import { type StyleProp, View, type ViewStyle } from "react-native";

import { IconBase } from "../../icons/IconBase";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import type { FieldTheme, InputVariant } from "./Field.theme";
import { useFieldControlState } from "./FieldContext";

export type FieldIconProps<G extends string> = IconComponentProps<G> & {
    style?: StyleProp<ViewStyle>;
};

/**
 * Non-interactive, field-themed icon sized for a control slot.
 *
 * Should be used for any static icons inside form inputs.
 */
export const FieldIcon = <G extends string>({
    style,
    ...iconProps
}: FieldIconProps<G>) => {
    const { variant } = useFieldControlState();
    const { styles, theme } = useComponent("field", {
        props: { variant },
        createStyles: createStyles,
    });

    return (
        <View accessible={false} aria-hidden style={[styles.icon, style]}>
            <IconBase
                {...iconProps}
                color={theme.icon.color}
                size={theme.icon.size}
            />
        </View>
    );
};

const createStyles = defineStyles(
    (theme: FieldTheme, props: { variant: InputVariant }) => {
        const size = theme.surface.minHeight[props.variant];

        return {
            icon: {
                width: size,
                minHeight: size,
                borderRadius: theme.surface.borderRadius,
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
            },
        };
    },
);
