import { type FC, useRef, useState } from "react";
import {
    Pressable,
    type TextInput as RnTextInput,
    StyleSheet,
} from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { Text } from "../text";
import { InputAction } from "./InputAction";
import { InputBase } from "./InputBase";
import { InputRowContainer } from "./InputRowContainer";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export type TimeInputValue = { hours: string; minutes: string };

const DEFAULT_TIME_VALUE: TimeInputValue = { hours: "", minutes: "" };

export type TimeInputIcons = ComponentIconAssets<"time">;

export interface TimeInputProps
    extends Pick<
            NumberInputBaseProps,
            "disabled" | "onSubmitEditing" | "clearButtonMode" | "variant"
        >,
        InputScaffoldFieldProps {
    value?: TimeInputValue;

    hoursPlaceholder?: string;

    minutesPlaceholder?: string;

    onChange?: (e: TimeInputValue) => void;
}

export const TimeInput: FC<TimeInputProps> = ({
    disabled: disabledProp,
    clearButtonMode,
    hoursPlaceholder,
    minutesPlaceholder,
    variant = "regular",
    value = DEFAULT_TIME_VALUE,
    onChange,
    onSubmitEditing,
    ...baseProps
}) => {
    const disabled = disabledProp || !onChange;
    const hoursRef = useRef<RnTextInput>(null);
    const minutesRef = useRef<RnTextInput>(null);
    const [styles, { icons }] = useThemedStyles("timeInput", createStyles, {
        props: { variant },
    });

    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputScaffold {...baseProps}>
            <InputRowContainer disabled={disabled}>
                <InputAction
                    {...icons.time}
                    variant={variant}
                    disabled={disabled}
                    onPress={() => hoursRef.current?.focus()}
                />
                <NumberInputBase
                    ref={hoursRef}
                    disabled={disabled}
                    placeholder={hoursPlaceholder}
                    maxLength={2}
                    clearButtonMode={clearButtonMode}
                    value={value?.hours}
                    variant={variant}
                    keyboardType="number-pad"
                    submitBehavior="submit"
                    returnKeyType="next"
                    inputStyle={styles.input}
                    onChangeText={(text) =>
                        onChange?.({
                            ...value,
                            hours: text,
                        })
                    }
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onSubmitEditing={() => minutesRef.current?.focus()}
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
                    variant={variant}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    inputStyle={styles.input}
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
                    variant={variant}
                    caretHidden
                    contextMenuHidden
                    disabled={disabled}
                    showSoftInputOnFocus={false}
                    inputStyle={styles.clearInput}
                    onFocus={() => onChange?.({ hours: "", minutes: "" })}
                />
            </InputRowContainer>
        </InputScaffold>
    );
};

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    { variant }: Required<Pick<TimeInputProps, "variant">>,
) =>
    StyleSheet.create({
        input: {
            flexGrow: 1,
            flexBasis: 0,
            textAlign: "right",
        },
        clearInput: {
            flexShrink: 1,
            marginStart: inputBase.container.padding,
        },
        timeLabel: {
            minHeight: inputBase.container.height[variant],
            justifyContent: "center",
        },
    });
