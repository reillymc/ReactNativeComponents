import { type FC, useRef, useState } from "react";
import { Pressable, type TextInput as RnTextInput } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { defineStyles, type PropFilter, useComponent } from "../shared";
import { Text } from "../text";
import { InputAction } from "./InputAction";
import { InputBase, type InputVariant } from "./InputBase";
import { InputRowContainer } from "./InputRowContainer";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export type TimeInputValue = { hours: string; minutes: string };

const DEFAULT_TIME_VALUE: TimeInputValue = { hours: "", minutes: "" };

export type TimeInputIcons = ComponentIconAssets<"time">;

export interface TimeInputTheme {
    padding: number;
    height: Record<InputVariant, number>;
}

export type TimeInputPlaceholders = {
    hours?: string;
    minutes?: string;
};

export interface TimeInputProps
    extends Pick<
            NumberInputBaseProps,
            "disabled" | "onSubmitEditing" | "clearButtonMode" | "variant"
        >,
        InputScaffoldFieldProps {
    value?: TimeInputValue;

    placeholder?: TimeInputPlaceholders;

    onChange?: (e: TimeInputValue) => void;
    theme?: DeepPartial<TimeInputTheme>;
}

export const TimeInput: FC<TimeInputProps> = ({
    disabled: disabledProp,
    clearButtonMode,
    placeholder,
    variant = "regular",
    value = DEFAULT_TIME_VALUE,
    onChange,
    onSubmitEditing,
    theme: themeOverrides,
    ...baseProps
}) => {
    const disabled = disabledProp || !onChange;
    const hoursRef = useRef<RnTextInput>(null);
    const minutesRef = useRef<RnTextInput>(null);
    const { styles, icons } = useComponent("timeInput", {
        themeOverrides,
        props: { variant },
        createStyles,
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
                    placeholder={placeholder?.hours}
                    maxLength={2}
                    clearButtonMode={clearButtonMode}
                    value={value?.hours}
                    variant={variant}
                    keyboardType="number-pad"
                    submitBehavior="submit"
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
                    placeholder={placeholder?.minutes}
                    value={value.minutes}
                    maxLength={2}
                    clearButtonMode={clearButtonMode}
                    variant={variant}
                    keyboardType="number-pad"
                    returnKeyType="done"
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
                    variant={variant}
                    caretHidden
                    contextMenuHidden
                    disabled={disabled}
                    showSoftInputOnFocus={false}
                    style={styles.clearInput}
                    onFocus={() => onChange?.({ hours: "", minutes: "" })}
                />
            </InputRowContainer>
        </InputScaffold>
    );
};

const createStyles = defineStyles(
    (theme: TimeInputTheme, props: PropFilter<TimeInputProps, "variant">) => ({
        input: {
            flexGrow: 1,
            flexBasis: 0,
            textAlign: "right",
        },
        clearInput: {
            flexShrink: 1,
            marginStart: theme.padding,
        },
        timeLabel: {
            minHeight: theme.height[props.variant],
            justifyContent: "center",
        },
    }),
);
