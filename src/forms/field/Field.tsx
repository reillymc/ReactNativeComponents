import { type FC, type ReactNode, useId } from "react";
import { Pressable, type StyleProp, View, type ViewStyle } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { Icon } from "../../icons/Icon";
import { defineStyles, useComponent } from "../../internal";
import { Text } from "../../typography/text";
import type { FieldTheme, InputVariant } from "./Field.theme";
import { FieldContext } from "./FieldContext";
import { useFieldControlRegistry } from "./useFieldControlRegistry";

const useFieldIds = () => {
    const id = useId().replace(/:/g, "");

    return {
        labelId: `field-label-${id}`,
        helpId: `field-help-${id}`,
        errorId: `field-error-${id}`,
    };
};

const getDescribedBy = (helpId?: string, errorId?: string) => {
    if (helpId && errorId) return `${helpId} ${errorId}`;
    return helpId ?? errorId;
};

export type FieldIcons = ComponentIconAssets<"error">;

type FieldBaseProps = {
    /** Help text rendered below the control. */
    help?: string;
    /**
     * Validation error. This is the single invalid source: when present, the
     * field is invalid and shows the error state.
     */
    error?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    variant?: InputVariant;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
};

type FieldLabelProps = {
    /** Label text. Also used as the accessible name when hidden. */
    label?: string;
    /** Hide the label visually while keeping it as the accessible name. */
    hideLabel?: boolean;
};

export type FieldProps = FieldBaseProps &
    FieldLabelProps & {
        /** Overrides Field scaffold styles. Field primitives resolve their own theme. */
        theme?: DeepPartial<FieldTheme>;
    };

export type FieldComponentProps = Omit<FieldProps, "children" | "theme">;

/**
 * Standard field scaffold: label, control, help/error copy, and required marker.
 *
 * Should be used to wrap any form input components. Composition:
 * `Field > FieldSurface (Optional) > FieldRow > FieldTextInput | FieldNumberInput |
 * FieldIcon | FieldAction | Custom Components`.
 */
export const Field: FC<FieldProps> = ({
    label,
    hideLabel,
    help,
    error,
    required = false,
    disabled = false,
    readOnly = false,
    variant = "regular",
    theme: themeOverrides,
    children,
    style,
}) => {
    const ids = useFieldIds();
    const { styles, theme, icons } = useComponent("field", {
        themeOverrides,
        createStyles,
    });
    const { registerControl, focusFirstControl } =
        useFieldControlRegistry(disabled);

    const hasVisibleLabel = label !== undefined && !hideLabel;

    return (
        <FieldContext.Provider
            value={{
                labelId: hasVisibleLabel ? ids.labelId : undefined,
                label: label ?? "",
                describedBy: getDescribedBy(
                    help ? ids.helpId : undefined,
                    error ? ids.errorId : undefined,
                ),
                hint: error ?? help,
                disabled,
                readOnly,
                required,
                invalid: !!error,
                variant,
                registerControl,
                focusFirstControl,
            }}
        >
            <View style={[styles.container, style]}>
                {hasVisibleLabel && (
                    <Pressable
                        accessible
                        accessibilityLabel={label}
                        nativeID={ids.labelId}
                        focusable={false}
                        tabIndex={-1}
                        onPress={focusFirstControl}
                        style={styles.labelContainer}
                    >
                        <Text variant="label" accessible={false}>
                            {label}
                        </Text>
                    </Pressable>
                )}
                <View style={styles.controlContainer}>
                    {children}
                    {required && (
                        <Text
                            variant="title"
                            accessible={false}
                            aria-hidden
                            style={styles.required}
                            theme={{ color: theme.required.color }}
                        >
                            {"\u2022"}
                        </Text>
                    )}
                </View>
                {(help || error) && (
                    <View style={styles.helpText}>
                        {!!error && (
                            <Icon
                                {...icons.error}
                                theme={{ color: theme.help.errorColor }}
                                size="small"
                            />
                        )}
                        {!!error && (
                            <Text
                                variant="caption"
                                nativeID={ids.errorId}
                                theme={{ color: theme.help.errorColor }}
                            >
                                {error}
                            </Text>
                        )}
                        {!!help && (
                            <Text
                                variant="caption"
                                nativeID={ids.helpId}
                                theme={{ color: theme.help.color }}
                            >
                                {help}
                            </Text>
                        )}
                    </View>
                )}
            </View>
        </FieldContext.Provider>
    );
};

const createStyles = defineStyles((theme: FieldTheme) => ({
    container: {
        alignSelf: "stretch",
        minWidth: 0,
        gap: theme.label.gap,
    },
    labelContainer: {
        marginStart: theme.surface.padding,
    },
    controlContainer: {
        position: "relative",
    },
    required: {
        position: "absolute",
        zIndex: 2,
        start: theme.surface.padding,
    },
    helpText: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.help.gap,
        marginStart: theme.help.inset,
        alignItems: "center",
    },
}));
