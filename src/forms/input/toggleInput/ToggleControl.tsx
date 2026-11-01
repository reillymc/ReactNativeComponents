import { StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { ActionBase, StateTint } from "../../../actions/action";
import { IconBase } from "../../../icons/IconBase";
import type { IconComponentProps } from "../../../icons/IconComponentProps";
import { defineStyles, useComponent } from "../../../internal";
import { Text } from "../../../typography/text";
import {
    fieldAria,
    type InputVariant,
    useFieldControlState,
} from "../../field";
import type { ToggleAppearance, ToggleInputTheme } from "./ToggleInput.theme";

type ToggleControlProps<G extends string> = {
    label?: string;
    value: boolean;
    onChange?: (value: boolean) => void;
    appearance: ToggleAppearance;
    themeOverrides?: DeepPartial<ToggleInputTheme>;
} & Partial<IconComponentProps<G>>;

export const ToggleControl = <G extends string>({
    label,
    value,
    onChange,
    appearance,
    themeOverrides,
    iconSet,
    iconName,
}: ToggleControlProps<G>) => {
    const { field, disabled, interactive, variant } = useFieldControlState();
    const { styles, theme, icons } = useComponent("toggleInput", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    const canToggle = interactive && !!onChange;
    const indicatorSize = theme.indicator.surfaceSize[variant];
    const selectedFillColor = theme.indicator.color.selected[appearance];
    const selectedIconColor = theme.indicator.color.icon[appearance];
    const customIconSize = theme.indicator.iconSize[variant];
    const selectedIcon =
        iconSet && iconName ? { iconSet, iconName } : icons.check;

    return (
        <ActionBase
            onPress={canToggle ? () => onChange?.(!value) : undefined}
            disabled={disabled}
            style={styles.control}
            role="switch"
            {...fieldAria(field, { state: { checked: value } })}
        >
            {(state) => (
                <StateTint {...state} style={styles.row}>
                    <View style={styles.iconContainer}>
                        <IconBase
                            {...(value ? icons.fill : icons.outline)}
                            size={indicatorSize}
                            color={
                                value
                                    ? selectedFillColor
                                    : theme.indicator.color.deselected
                            }
                        />
                        {!!value && (
                            <View style={styles.icon}>
                                <IconBase
                                    {...selectedIcon}
                                    size={customIconSize}
                                    color={selectedIconColor}
                                />
                            </View>
                        )}
                    </View>
                    {label !== undefined && (
                        <View
                            accessible={false}
                            importantForAccessibility="no-hide-descendants"
                            aria-hidden
                        >
                            <Text variant="label">{label}</Text>
                        </View>
                    )}
                </StateTint>
            )}
        </ActionBase>
    );
};

const createStyles = defineStyles(
    (theme: ToggleInputTheme, props: { variant: InputVariant }) => ({
        control: {
            justifyContent: "center",
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.label.gap,
        },
        iconContainer: {
            width: theme.indicator.surfaceSize[props.variant],
            height: theme.indicator.surfaceSize[props.variant],
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
        },
    }),
);
