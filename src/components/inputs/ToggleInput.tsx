import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle, type ColorValue } from "react-native";

import { ThemedStyles } from "../../hooks";
import { ActionSize, ActionVariant } from "../buttons";
import { Icon } from "../Icon";
import { Text } from "../Text";

import type { DeepPartial } from "../../helpers";
import { useThemedStylesWithOverride } from "../../hooks";
import { BaseInputProps } from "./BaseInput";

export type ToggleInputStyles = {
    indicator: {
        size: { [key in ActionSize]: number };
        color: ColorValue;
        selectedColor: { [key in ActionVariant]: ColorValue };
    };
    label: {
        gap: number;
    };
};

export interface ToggleInputProps extends Pick<BaseInputProps, "disabled" | "helpText"> {
    label?: string;
    value?: boolean;
    iconVariant?: "check" | "dot";
    variant?: ActionVariant;
    size?: ActionSize;
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
    size = "regular",
    containerStyle,
    disabled,
    styles: styleOverrides,
    onChange,
}) => {
    const [styles, { toggleInput }] = useThemedStylesWithOverride(
        createStyles,
        { toggleInput: styleOverrides },
        { variant, size, value, disabled },
    );

    return (
        <Pressable
            disabled={disabled}
            hitSlop={16}
            style={[styles.container, containerStyle]}
            onPress={() => onChange(!value)}
        >
            <View style={styles.labelIconContainer}>
                <View style={styles.iconContainer}>
                    {iconVariant === "check" ? (
                        <Icon
                            set="octicons"
                            iconName={!!value ? "check-circle-fill" : "circle"}
                            size={toggleInput.indicator.size[size]}
                            style={styles.icon}
                        />
                    ) : (
                        <>
                            <Icon
                                set="octicons"
                                iconName="circle"
                                size={toggleInput.indicator.size[size]}
                                style={styles.icon}
                            />
                            {!!value && (
                                <Icon
                                    set="octicons"
                                    iconName="dot-fill"
                                    size={toggleInput.indicator.size[size]}
                                    style={[styles.icon, styles.innerIcon]}
                                />
                            )}
                        </>
                    )}
                </View>
                {label && (
                    <Text variant="label" style={styles.label}>
                        {label}
                    </Text>
                )}
            </View>
            {helpText && (
                <View style={styles.helpText}>
                    {typeof helpText === "string" ? <Text variant="caption">{helpText}</Text> : helpText}
                </View>
            )}
        </Pressable>
    );
};

ToggleInput.displayName = "ToggleInput";

const createStyles = (
    { theme: { color }, styles: { toggleInput, baseInput } }: ThemedStyles,
    { variant = "primary", size = "regular", value, disabled }: Partial<ToggleInputProps>,
) => {
    let iconColor = toggleInput.indicator.color;
    if (value) iconColor = toggleInput.indicator.selectedColor[variant];
    if (disabled) iconColor = color.textDisabled;

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
        },
        labelIconContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        iconContainer: {
            width: toggleInput.indicator.size[size],
            height: toggleInput.indicator.size[size],
        },
        icon: {
            color: iconColor,
            position: "absolute",
        },
        innerIcon: {
            alignSelf: "center",
        },
        label: {
            marginLeft: toggleInput.label.gap,
            color: disabled ? color.textDisabled : color.textPrimary,
        },
        helpText: {
            marginLeft: toggleInput.indicator.size[size] + toggleInput.label.gap,
            marginTop: baseInput.labelMargin,
        },
    });
    return styles;
};
