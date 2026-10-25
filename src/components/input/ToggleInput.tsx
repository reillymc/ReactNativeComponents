import { type ColorValue, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { ActionBase, StateTint } from "../action";
import { IconBase, type IconComponentProps } from "../icon";
import { defineStyles, type PropFilter, useComponent } from "../shared";
import { Text } from "../text";
import type { InputBaseProps, InputVariant } from "./InputBase";
import type { InputScaffoldFieldProps } from "./InputScaffold";

type ToggleVariant = "primary" | "secondary";

export type ToggleInputIcons = ComponentIconAssets<"outline">;

export type ToggleInputTheme = {
    indicator: {
        size: { [Size in InputVariant]: number };
        color: {
            deselected: {
                enabled: ColorValue;
                disabled: ColorValue;
            };
            selected: Record<ToggleVariant, ColorValue>;
        };
    };
    label: {
        gap: number;
    };
    disabledLabelColor: ColorValue;
    helpTextGap: number;
};

export interface ToggleInputProps
    extends Pick<
            InputScaffoldFieldProps,
            "helpText" | "label" | "containerStyle"
        >,
        Pick<InputBaseProps, "variant" | "disabled"> {
    value?: boolean;
    toggleVariant?: ToggleVariant;
    theme?: DeepPartial<ToggleInputTheme>;
    onChange: (value: boolean) => void;
}

export const ToggleInput = <G extends string>({
    label,
    helpText,
    value = false,
    toggleVariant = "primary",
    containerStyle,
    variant = "regular",
    disabled: disabledProp,
    theme: themeOverrides,
    onChange,
    ...iconProps
}: ToggleInputProps & IconComponentProps<G>) => {
    const disabled = disabledProp || !onChange;

    const { styles, theme, icons } = useComponent("toggleInput", {
        themeOverrides,
        props: { variant },
        createStyles,
    });

    const deselectedColor = disabled
        ? theme.indicator.color.deselected.disabled
        : theme.indicator.color.deselected.enabled;

    return (
        <View style={containerStyle}>
            <ActionBase
                disabled={disabled}
                hitSlop={20}
                style={styles.container}
                onPress={() => onChange(!value)}
            >
                {(state) => (
                    <>
                        <StateTint {...state} style={styles.labelIconContainer}>
                            <View style={styles.iconContainer}>
                                <IconBase
                                    {...icons.outline}
                                    size={theme.indicator.size[variant]}
                                    color={
                                        value
                                            ? theme.indicator.color.selected[
                                                  toggleVariant
                                              ]
                                            : deselectedColor
                                    }
                                />
                                <View style={styles.icon}>
                                    {!!value && (
                                        <IconBase
                                            {...iconProps}
                                            size={theme.indicator.size[variant]}
                                            color={
                                                theme.indicator.color.selected[
                                                    toggleVariant
                                                ]
                                            }
                                        />
                                    )}
                                </View>
                            </View>
                            {label && (
                                <Text
                                    variant="label"
                                    style={
                                        disabled
                                            ? styles.disabledLabel
                                            : undefined
                                    }
                                >
                                    {label}
                                </Text>
                            )}
                        </StateTint>
                        {helpText && (
                            <View style={styles.helpText}>
                                {typeof helpText === "string" ? (
                                    <Text variant="caption">{helpText}</Text>
                                ) : (
                                    helpText
                                )}
                            </View>
                        )}
                    </>
                )}
            </ActionBase>
        </View>
    );
};

const createStyles = defineStyles(
    (
        theme: ToggleInputTheme,
        props: PropFilter<ToggleInputProps, "variant">,
    ) => ({
        container: {
            justifyContent: "center",
        },
        disabledLabel: {
            color: theme.disabledLabelColor,
        },
        labelIconContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.label.gap,
        },
        iconContainer: {
            width: theme.indicator.size[props.variant],
            height: theme.indicator.size[props.variant],
        },
        icon: {
            position: "absolute",
            alignSelf: "center",
        },
        helpText: {
            marginStart: theme.indicator.size[props.variant] + theme.label.gap,
            marginTop: theme.helpTextGap,
        },
    }),
);
