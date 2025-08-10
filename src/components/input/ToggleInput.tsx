import type { FC, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { ActionBase } from "../action";
import { InteractiveIcon, type InteractiveIconStyles } from "../icon";
import { Text } from "../text";
import type { InputBaseProps, InputVariant } from "./InputBase";
import type { InputScaffoldProps } from "./InputScaffold";

type ToggleVariant = "primary" | "secondary";

export type ToggleInputStyles = {
    indicator: {
        size: { [Size in InputVariant]: number };
        color: {
            deselected: InteractiveIconStyles["color"];
            selected: Record<ToggleVariant, InteractiveIconStyles["color"]>;
        };
    };
    label: {
        gap: number;
    };
};

export interface ToggleInputProps
    extends Pick<InputScaffoldProps, "helpText" | "label" | "containerStyle">,
        Pick<InputBaseProps, "variant" | "disabled"> {
    value?: boolean;
    iconVariant?: "check" | "dot";
    toggleVariant?: ToggleVariant;
    styles?: DeepPartial<ToggleInputStyles>;
    onChange: (value: boolean) => undefined | null | SetStateAction<boolean>;
}

export const ToggleInput: FC<ToggleInputProps> = ({
    label,
    helpText,
    value = false,
    iconVariant = "dot",
    toggleVariant = "primary",
    containerStyle,
    variant = "regular",
    disabled: disabledProp,
    styles: styleOverrides,
    onChange,
}) => {
    const disabled = disabledProp || !onChange;

    const [styles, { toggleInput }] = useThemedStylesWithOverride(
        createStyles,
        { toggleInput: styleOverrides },
        { variant },
    );

    return (
        <ActionBase
            disabled={disabled}
            containerStyle={[styles.container, containerStyle]}
            onPress={() => onChange(!value)}
        >
            {(pressableState) => (
                <>
                    <View style={styles.labelIconContainer}>
                        <View style={styles.iconContainer}>
                            {iconVariant === "check" ? (
                                <InteractiveIcon
                                    iconSet={Octicons}
                                    iconName={
                                        value ? "check-circle-fill" : "circle"
                                    }
                                    style={{
                                        size: toggleInput.indicator.size[
                                            variant
                                        ],
                                        color: value
                                            ? toggleInput.indicator.color
                                                  .selected[toggleVariant]
                                            : toggleInput.indicator.color
                                                  .deselected,
                                    }}
                                    disabled={disabled}
                                    {...pressableState}
                                />
                            ) : (
                                <>
                                    <InteractiveIcon
                                        iconSet={Octicons}
                                        iconName="circle"
                                        style={{
                                            size: toggleInput.indicator.size[
                                                variant
                                            ],
                                            color: value
                                                ? toggleInput.indicator.color
                                                      .selected[toggleVariant]
                                                : toggleInput.indicator.color
                                                      .deselected,
                                        }}
                                        disabled={disabled}
                                        {...pressableState}
                                    />
                                    {!!value && (
                                        <View style={styles.icon}>
                                            <InteractiveIcon
                                                iconSet={Octicons}
                                                iconName="dot-fill"
                                                style={{
                                                    size: toggleInput.indicator
                                                        .size[variant],
                                                    color: toggleInput.indicator
                                                        .color.selected[
                                                        toggleVariant
                                                    ],
                                                }}
                                                disabled={disabled}
                                                {...pressableState}
                                            />
                                        </View>
                                    )}
                                </>
                            )}
                        </View>
                        {label && (
                            <Text variant="label" disabled={disabled}>
                                {label}
                            </Text>
                        )}
                    </View>
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
    );
};

ToggleInput.displayName = "ToggleInput";

const createStyles = (
    { styles: { toggleInput, inputScaffold } }: ThemedStyles,
    { variant }: Required<Pick<ToggleInputProps, "variant">>,
) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
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
            marginLeft:
                toggleInput.indicator.size[variant] + toggleInput.label.gap,
            marginTop: inputScaffold.gap,
        },
    });
    return styles;
};
