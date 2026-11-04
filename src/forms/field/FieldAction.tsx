import { IconActionBase, type IconActionBaseProps } from "../../actions/action";
import type { IconComponentProps } from "../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../internal";
import type { FieldTheme, InputVariant } from "./Field.theme";
import { useFieldControlState } from "./FieldContext";
import { FieldIcon } from "./FieldIcon";

export type FieldActionProps<G extends string> = IconComponentProps<G> &
    Pick<
        IconActionBaseProps,
        "tabIndex" | "accessibilityLabel" | "onPress" | "style"
    >;

/**
 * Labeled field icon action that interfaces with field context and styles.
 *
 * Owns its own focus ring and does not report focus to `FieldSurface`, so
 * action focus is visually separate from input focus.
 *
 * Should be used for any actions inside form inputs.
 */
export const FieldAction = <G extends string>({
    onPress,
    accessibilityLabel,
    style,
    tabIndex,
    ...iconProps
}: FieldActionProps<G>) => {
    const { interactive, variant } = useFieldControlState();
    const { styles, theme } = useComponent("field", {
        props: { variant },
        createStyles: createStyles,
    });

    if (!(interactive && !!onPress)) {
        return <FieldIcon {...iconProps} style={style} />;
    }

    return (
        <IconActionBase
            {...iconProps}
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
            style={[styles.icon, style]}
            theme={{ color: theme.icon.color }}
            iconSize={theme.icon.size}
            hitSlop={0}
            tabIndex={tabIndex}
        />
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
            },
        };
    },
);
