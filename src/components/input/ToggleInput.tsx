import { type ColorValue, StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { ActionBase, StateTint } from "../action";
import { IconBase, type IconComponentProps } from "../icon";
import { Text } from "../text";
import type { InputBaseProps, InputVariant } from "./InputBase";
import type { InputScaffoldFieldProps } from "./InputScaffold";

type ToggleVariant = "primary" | "secondary";

export type ToggleInputIcons = ComponentIconAssets<"outline">;

export type ToggleInputStyles = {
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
};

export interface ToggleInputProps
    extends Pick<
            InputScaffoldFieldProps,
            "helpText" | "label" | "containerStyle"
        >,
        Pick<InputBaseProps, "variant" | "disabled"> {
    value?: boolean;
    toggleVariant?: ToggleVariant;
    style?: DeepPartial<ToggleInputStyles>;
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
    style: styleOverrides,
    onChange,
    ...iconProps
}: ToggleInputProps & IconComponentProps<G>) => {
    const disabled = disabledProp || !onChange;

    const [styles, { style: toggleInput, icons }] = useThemedStyles(
        "toggleInput",
        createStyles,
        { styles: { toggleInput: styleOverrides }, props: { variant } },
    );

    const deselectedColor = disabled
        ? toggleInput.indicator.color.deselected.disabled
        : toggleInput.indicator.color.deselected.enabled;

    return (
        <View style={containerStyle}>
            <ActionBase
                disabled={disabled}
                hitSlop={20}
                containerStyle={styles.container}
                onPress={() => onChange(!value)}
            >
                {(state) => (
                    <>
                        <StateTint {...state} style={styles.labelIconContainer}>
                            <View style={styles.iconContainer}>
                                <IconBase
                                    {...icons.outline}
                                    size={toggleInput.indicator.size[variant]}
                                    color={
                                        value
                                            ? toggleInput.indicator.color
                                                  .selected[toggleVariant]
                                            : deselectedColor
                                    }
                                />
                                <View style={styles.icon}>
                                    {!!value && (
                                        <IconBase
                                            {...iconProps}
                                            size={
                                                toggleInput.indicator.size[
                                                    variant
                                                ]
                                            }
                                            color={
                                                toggleInput.indicator.color
                                                    .selected[toggleVariant]
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

const createStyles = (
    { styles: { toggleInput, inputScaffold, inputBase } }: ThemedStyles,
    { variant }: Required<Pick<ToggleInputProps, "variant">>,
) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
        },
        disabledLabel: {
            color: inputBase.text.color.disabled,
        },
        labelIconContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: toggleInput.label.gap,
        },
        iconContainer: {
            width: toggleInput.indicator.size[variant],
            height: toggleInput.indicator.size[variant],
        },
        icon: {
            position: "absolute",
            alignSelf: "center",
        },
        helpText: {
            marginStart:
                toggleInput.indicator.size[variant] + toggleInput.label.gap,
            marginTop: inputScaffold.gap,
        },
    });
    return styles;
};
