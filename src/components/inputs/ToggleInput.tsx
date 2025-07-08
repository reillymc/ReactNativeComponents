import type React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { Octicons } from "@expo/vector-icons";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { ActionBase } from "../action";
import { InteractiveIcon, type InteractiveIconStyles } from "../icon";
import { Text } from "../text";
import type { InputScaffoldProps } from "./InputScaffold";

type ToggleSize = "small" | "medium";
type ToggleVariant = "primary" | "secondary";

export type ToggleInputStyles = {
    indicator: {
        size: { [Size in ToggleSize]: number };
        color: {
            deselected: InteractiveIconStyles["color"];
            selected: Record<ToggleVariant, InteractiveIconStyles["color"]>;
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
                                    style={{
                                        size: toggleInput.indicator.size[size],
                                        color: value
                                            ? toggleInput.indicator.color
                                                  .selected[variant]
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
                                                size
                                            ],
                                            color: value
                                                ? toggleInput.indicator.color
                                                      .selected[variant]
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
                                                        .size[size],
                                                    color: toggleInput.indicator
                                                        .color.selected[
                                                        variant
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
            marginTop: inputScaffold.gap,
        },
    });
    return styles;
};
