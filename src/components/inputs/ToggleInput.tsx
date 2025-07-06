import type React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { Octicons } from "@expo/vector-icons";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { ActionBase } from "../action";
import { InteractiveIcon, type InteractiveIconStyles } from "../icon";
import { InteractiveText, Text } from "../text";
import type { InputScaffoldProps } from "./InputScaffold";

type ToggleSize = "small" | "medium";
type ToggleVariant = "primary" | "secondary";

export type ToggleInputStyles = {
    indicator: {
        size: { [Size in ToggleSize]: number };
        color: InteractiveIconStyles["color"];
        selectedColor: {
            [Variant in ToggleVariant]: InteractiveIconStyles["color"];
        };
    };
    label: {
        gap: number;
    };
};

export interface ToggleInputProps extends Pick<InputScaffoldProps, "helpText"> {
    label?: string;
    disabled?: boolean;
    value?: boolean;
    iconVariant?: "check" | "dot";
    variant?: ToggleVariant;
    size?: ToggleSize;
    containerStyle?: StyleProp<ViewStyle>;
    styles?: DeepPartial<ToggleInputStyles>;
    onChange: (value: boolean) => void | null | React.SetStateAction<boolean>;
}

export const ToggleInput: React.FC<ToggleInputProps> = ({
    label,
    helpText,
    value = false,
    iconVariant = "dot",
    variant = "primary",
    size = "medium",
    containerStyle,
    disabled: disabledProp,
    styles: styleOverrides,
    onChange,
}) => {
    const disabled = disabledProp || !onChange;

    const [styles, { toggleInput }] = useThemedStylesWithOverride(
        createStyles,
        { toggleInput: styleOverrides },
        { size },
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
                                    size={size}
                                    style={{
                                        color: value
                                            ? toggleInput.indicator
                                                  .selectedColor[variant]
                                            : toggleInput.indicator.color,
                                    }}
                                    disabled={disabled}
                                    {...pressableState}
                                />
                            ) : (
                                <>
                                    <InteractiveIcon
                                        iconSet={Octicons}
                                        iconName="circle"
                                        size={size}
                                        style={{
                                            color: value
                                                ? toggleInput.indicator
                                                      .selectedColor[variant]
                                                : toggleInput.indicator.color,
                                        }}
                                        disabled={disabled}
                                        {...pressableState}
                                    />
                                    {!!value && (
                                        <View style={styles.icon}>
                                            <InteractiveIcon
                                                iconSet={Octicons}
                                                iconName="dot-fill"
                                                size={size}
                                                style={{
                                                    color: value
                                                        ? toggleInput.indicator
                                                              .selectedColor[
                                                              variant
                                                          ]
                                                        : toggleInput.indicator
                                                              .color,
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
                            <InteractiveText
                                textVariant="label"
                                disabled={disabled}
                                {...pressableState}
                            >
                                {label}
                            </InteractiveText>
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
    { styles: { toggleInput, baseInput } }: ThemedStyles,
    { size = "medium" }: Partial<ToggleInputProps>,
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
            width: toggleInput.indicator.size[size],
            height: toggleInput.indicator.size[size],
        },
        icon: {
            position: "absolute",
            alignSelf: "center",
        },
        helpText: {
            marginLeft:
                toggleInput.indicator.size[size] + toggleInput.label.gap,
            marginTop: baseInput.labelMargin,
        },
    });
    return styles;
};
