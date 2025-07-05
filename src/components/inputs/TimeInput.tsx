import React, { type FC } from "react";
import {
    Pressable,
    type TextInput as RnTextInput,
    StyleSheet,
    View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconButton } from "../button";
import { Text } from "../text";
import { InputBase } from "./InputBase";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export type TimeInputValue = { hours: string; minutes: string };

export type TimeInputStyles = {};

export interface TimeInputProps
    extends Pick<
            NumberInputBaseProps,
            "label" | "disabled" | "onSubmitEditing" | "clearButtonMode"
        >,
        Pick<
            InputScaffoldProps,
            "label" | "helpText" | "mandatory" | "hasError"
        > {
    value?: TimeInputValue;

    hoursPlaceholder?: string;

    minutesPlaceholder?: string;

    onChange?: (e: TimeInputValue) => void;
}

export const TimeInput: FC<TimeInputProps> = ({
    disabled,
    clearButtonMode,
    hoursPlaceholder,
    minutesPlaceholder,
    value = { hours: "", minutes: "" },
    onChange,
    onSubmitEditing,
    label,
    helpText,
    mandatory,
    hasError,
}) => {
    const hoursRef = React.useRef<RnTextInput>(null);
    const minutesRef = React.useRef<RnTextInput>(null);
    const styles = useThemedStyles(createStyles, { value, disabled });

    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <InputScaffold
            label={label}
            helpText={helpText}
            mandatory={mandatory}
            hasError={hasError}
        >
            <View style={styles.container}>
                <IconButton
                    variant="secondary"
                    iconName="clock"
                    containerStyle={styles.iconContainer}
                    iconSet={Octicons}
                />
                <NumberInputBase
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
                    onChangeText={(text) =>
                        onChange?.({
                            ...value,
                            hours: text,
                        })
                    }
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <Pressable
                    onPress={() => hoursRef.current?.focus()}
                    style={styles.timeLabel}
                >
                    <Text variant="body">h</Text>
                </Pressable>

                <NumberInputBase
                    ref={minutesRef}
                    disabled={disabled}
                    placeholder={minutesPlaceholder}
                    value={value.minutes}
                    maxLength={2}
                    clearButtonMode={clearButtonMode}
                    keyboardType="number-pad"
                    style={styles.input}
                    onChangeText={(text) => {
                        const addToHours = text
                            ? Math.floor(Number.parseInt(text, 10) / 60)
                            : undefined;
                        const remainingMinutes = text
                            ? Number.parseInt(text, 10) % 60
                            : text;
                        onChange?.({
                            ...value,
                            hours: value.hours
                                ? (
                                      Number.parseInt(value.hours, 10) +
                                      (addToHours ?? 0)
                                  ).toString()
                                : (addToHours?.toString() ?? ""),
                            minutes: remainingMinutes.toString(),
                        });
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onSubmitEditing={onSubmitEditing}
                />
                <Pressable
                    style={styles.timeLabel}
                    onPress={() => minutesRef.current?.focus()}
                >
                    <Text variant="body">m</Text>
                </Pressable>
                <InputBase
                    clearButtonMode={
                        disabled || !isFocused ? "never" : "always"
                    }
                    value={
                        value.hours !== "" || value.minutes !== "" ? " " : ""
                    }
                    selectionColor="transparent"
                    focusable={false}
                    autoComplete="off"
                    caretHidden
                    contextMenuHidden
                    disabled={disabled}
                    showSoftInputOnFocus={false}
                    style={styles.clearInput}
                    onFocus={() => onChange?.({ hours: "", minutes: "" })}
                />
            </View>
        </InputScaffold>
    );
};

const createStyles = (
    { styles: { baseInput }, theme: { spacing, color } }: ThemedStyles,
    { disabled }: Partial<TimeInputProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
            paddingLeft: baseInput.padding,
        },
        input: {
            textAlign: "right",
            paddingRight: spacing.tiny,
            flex: 1,
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
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : undefined,
        },
        icon: {
            color: color.textPrimary,
        },
    });
    return styles;
};
