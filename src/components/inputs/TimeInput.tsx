import React from "react";
import { TextInput as RNTextInput, View, StyleSheet, Pressable } from "react-native";

import { IconButton } from "../buttons";
import { ThemedStyles, useForwardedRef, useThemedStyles } from "../../hooks";
import { Text } from "../Text";

import { BaseInput, BaseInputProps } from "./BaseInput";
import { NumberInput } from "./NumberInput";
import { InputWidth } from "./types";

export type TimeInputValue = { hours: string; minutes: string };

export interface TimeInputStyles {}

export interface TimeInputProps
    extends Pick<BaseInputProps, "label" | "disabled" | "onSubmitEditing" | "clearButtonMode"> {
    value?: TimeInputValue;

    width?: Exclude<InputWidth, "large" | "full">;

    hoursPlaceholder?: string;

    minutesPlaceholder?: string;

    onChange?: (e: TimeInputValue) => void;
}

export const TimeInput = React.forwardRef<RNTextInput, TimeInputProps>(
    (
        {
            disabled,
            clearButtonMode,
            hoursPlaceholder,
            minutesPlaceholder,
            width,
            value = { hours: "", minutes: "" },
            onChange,
            onSubmitEditing,
            ...baseProps
        },
        ref,
    ) => {
        const hoursRef = useForwardedRef(ref);
        const minutesRef = React.useRef<RNTextInput>(null);
        const styles = useThemedStyles(createStyles, { value, disabled });

        const [isFocused, setIsFocused] = React.useState(false);

        return (
            <BaseInput
                {...baseProps}
                width={width}
                disabled={disabled}
                inputElement={
                    <View style={styles.container}>
                        <IconButton
                            variant="secondary"
                            disabled
                            iconName="clock"
                            style={styles.iconContainer}
                            iconStyle={styles.icon}
                        />
                        <NumberInput
                            ref={hoursRef}
                            disabled={disabled}
                            placeholder={hoursPlaceholder}
                            maxLength={2}
                            clearButtonMode={clearButtonMode}
                            value={value?.hours}
                            keyboardType="number-pad"
                            returnKeyLabel="next"
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={text =>
                                onChange?.({
                                    ...value,
                                    hours: text,
                                })
                            }
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <Pressable onPress={() => hoursRef.current?.focus()} style={styles.timeLabel}>
                            <Text variant="body">h</Text>
                        </Pressable>
                        <NumberInput
                            ref={minutesRef}
                            disabled={disabled}
                            placeholder={minutesPlaceholder}
                            value={value.minutes}
                            maxLength={2}
                            clearButtonMode={clearButtonMode}
                            keyboardType="number-pad"
                            style={styles.input}
                            onChangeText={text => {
                                const addToHours = text ? Math.floor(parseInt(text, 10) / 60) : undefined;
                                const remainingMinutes = text ? parseInt(text, 10) % 60 : text;
                                onChange?.({
                                    ...value,
                                    hours: value.hours
                                        ? (parseInt(value.hours, 10) + (addToHours ?? 0)).toString()
                                        : addToHours?.toString() ?? "",
                                    minutes: remainingMinutes.toString(),
                                });
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onSubmitEditing={onSubmitEditing}
                        />

                        <Pressable style={styles.timeLabel} onPress={() => minutesRef.current?.focus()}>
                            <Text variant="body">m</Text>
                        </Pressable>
                        <BaseInput
                            clearButtonMode={disabled || !isFocused ? "never" : "always"}
                            value={value.hours !== "" || value.minutes !== "" ? " " : ""}
                            selectionColor="transparent"
                            focusable={false}
                            autoComplete="off"
                            caretHidden
                            contextMenuHidden
                            width="small"
                            disabled={disabled}
                            showSoftInputOnFocus={false}
                            containerStyle={styles.clearInput}
                            style={styles.clearInput}
                            onFocus={() => onChange?.({ hours: "", minutes: "" })}
                        />
                    </View>
                }
            />
        );
    },
);

(TimeInput as React.FunctionComponent).displayName = "TimeInput";

const createStyles = (
    { styles: { baseInput }, theme: { spacing, color } }: ThemedStyles,
    { disabled }: Partial<TimeInputProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
            paddingLeft: baseInput.padding,
        },
        input: {
            textAlign: "right",
            paddingRight: spacing.tiny,
        },
        clearInput: {
            width: 28,
            marginRight: spacing.small,
        },
        timeLabel: {
            paddingRight: baseInput.padding,
            height: baseInput.height,
            justifyContent: "center",
        },
        iconContainer: {
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : undefined,
        },
        icon: {
            color: color.textPrimary,
        },
    });
    return styles;
};
