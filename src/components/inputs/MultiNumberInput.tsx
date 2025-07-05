import React, { type FC, type Ref } from "react";
import {
    type TextInput as DefaultTextInput,
    StyleSheet,
    View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconButton } from "../button";
import { Text } from "../text";
import { BaseInput, type BaseInputProps } from "./BaseInput";
import { NumberInput } from "./NumberInput";

export type NumberValue = { representation: "number"; value: string };
export type RangeValue = { representation: "range"; value: [string, string] };
export type FractionValue = {
    representation: "fraction";
    value: [string, string, string];
};

export type MultiNumberInputValue = NumberValue | FractionValue | RangeValue;

export type MultiNumberInputStyles = {};

export interface MultiNumberInputProps
    extends Pick<
        BaseInputProps,
        | "label"
        | "disabled"
        | "placeholder"
        | "width"
        | "maxLength"
        | "onSubmitEditing"
        | "clearButtonMode"
        | "containerStyle"
    > {
    keyboardType?: "decimal-pad" | "number-pad";

    enabledRepresentations?: ("number" | "fraction" | "range")[];

    value?: MultiNumberInputValue;

    placeholder2?: string;

    ref?: Ref<DefaultTextInput | null>;

    onChange?: (e: MultiNumberInputValue) => void;
}

export const MultiNumberInput: FC<MultiNumberInputProps> = ({
    keyboardType = "number-pad",
    enabledRepresentations = ["number", "fraction", "range"],
    disabled,
    clearButtonMode,
    placeholder,
    placeholder2,
    width,
    maxLength,
    value = { representation: "number", value: "" },
    onChange,
    onSubmitEditing,
    ref,

    ...baseProps
}) => {
    const styles = useThemedStyles(createStyles, {
        value,
        disabled,
        enabledRepresentations,
    });

    const icon: keyof typeof Octicons.glyphMap = {
        // TODO: decouple
        number: "infinity" as const,
        fraction: "number" as const,
        range: "arrow-both" as const,
    }[value.representation];

    const handleChangeMode = React.useCallback(() => {
        const currentIndex = enabledRepresentations.indexOf(
            value.representation,
        );
        const nextIndex =
            currentIndex + 1 >= enabledRepresentations.length
                ? 0
                : currentIndex + 1;

        const nextMode = enabledRepresentations[nextIndex];
        if (!nextMode) {
            return;
        }
        if (nextMode === "number") {
            if (value.representation === "number") {
                return;
            }

            onChange?.({ representation: nextMode, value: value.value?.[0] });
            return;
        }

        if (nextMode === "fraction") {
            switch (value.representation) {
                case "number":
                    onChange?.({
                        representation: nextMode,
                        value: [value.value ?? "", "", ""],
                    });
                    return;
                case "fraction":
                    return;
                case "range":
                    onChange?.({
                        representation: nextMode,
                        value: [value.value?.[0] ?? "", "", ""],
                    });
                    return;
            }
        }

        if (nextMode === "range") {
            switch (value.representation) {
                case "number":
                    onChange?.({
                        representation: nextMode,
                        value: [value.value ?? "", ""],
                    });
                    return;
                case "fraction":
                    onChange?.({
                        representation: nextMode,
                        value: [value.value?.[0] ?? "", ""],
                    });
                    return;
                case "range":
                    return;
            }
        }
    }, [enabledRepresentations, onChange, value.representation, value.value]);

    const handlePrimaryInputChangeText = React.useCallback(
        (text: string) => {
            switch (value.representation) {
                case "number":
                    onChange?.({
                        representation: value.representation,
                        value: text,
                    });
                    break;
                case "fraction":
                    onChange?.({
                        representation: value.representation,
                        value: [
                            text,
                            value.value?.[1] ?? "",
                            value.value?.[2] ?? "",
                        ],
                    });
                    break;
                case "range":
                    onChange?.({
                        representation: value.representation,
                        value: [text, value.value?.[1] ?? ""],
                    });
                    break;
            }
        },
        [onChange, value.representation, value.value],
    );

    return (
        <BaseInput
            {...baseProps}
            width={width}
            disabled={disabled}
            inputElement={
                <View style={styles.container}>
                    <IconButton
                        variant="secondary"
                        disabled={disabled}
                        iconName={icon}
                        iconSet={Octicons}
                        containerStyle={styles.iconContainer}
                        onPress={handleChangeMode}
                    />
                    <NumberInput
                        ref={ref}
                        disabled={disabled}
                        placeholder={
                            value.representation !== "range"
                                ? placeholder
                                : placeholder2
                        }
                        maxLength={maxLength}
                        clearButtonMode={clearButtonMode}
                        value={
                            value.representation === "number"
                                ? value.value
                                : value.value?.[0]
                        }
                        keyboardType={
                            value.representation === "fraction"
                                ? "number-pad"
                                : keyboardType
                        }
                        style={styles.primaryInput}
                        onChangeText={handlePrimaryInputChangeText}
                        onSubmitEditing={
                            value.representation === "number"
                                ? onSubmitEditing
                                : undefined
                        }
                    />
                    {value.representation === "fraction" && (
                        <NumberInput
                            disabled={disabled}
                            placeholder={placeholder2}
                            value={value.value?.[1]}
                            maxLength={maxLength}
                            clearButtonMode={clearButtonMode}
                            keyboardType="number-pad"
                            style={styles.input}
                            onChangeText={(text) =>
                                onChange?.({
                                    representation: value.representation,
                                    value: [
                                        value.value?.[0] ?? "",
                                        text,
                                        value.value?.[2] ?? "",
                                    ],
                                })
                            }
                            onSubmitEditing={onSubmitEditing}
                        />
                    )}
                    {value.representation !== "number" && (
                        <>
                            <Text variant="title">
                                {value.representation === "fraction"
                                    ? "/"
                                    : "\u2212"}
                            </Text>
                            <NumberInput
                                disabled={disabled}
                                placeholder={placeholder2}
                                value={
                                    value.representation === "fraction"
                                        ? value.value?.[2]
                                        : value.value?.[1]
                                }
                                maxLength={maxLength}
                                clearButtonMode={clearButtonMode}
                                keyboardType={
                                    value.representation === "fraction"
                                        ? "number-pad"
                                        : keyboardType
                                }
                                style={styles.input}
                                onChangeText={(text) => {
                                    if (value.representation === "fraction") {
                                        onChange?.({
                                            representation:
                                                value.representation,
                                            value: [
                                                value.value?.[0] ?? "",
                                                value.value?.[1] ?? "",
                                                text,
                                            ],
                                        });
                                        return;
                                    }
                                    onChange?.({
                                        representation: value.representation,
                                        value: [value.value?.[0] ?? "", text],
                                    });
                                }}
                                onSubmitEditing={onSubmitEditing}
                            />
                        </>
                    )}
                </View>
            }
        />
    );
};

const createStyles = (
    { styles: { baseInput }, theme: { color } }: ThemedStyles,
    { disabled, value, enabledRepresentations }: Partial<MultiNumberInputProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
            paddingHorizontal: baseInput.padding,
        },
        primaryInput: {
            textAlign: value?.representation === "range" ? "center" : "left",
        },
        input: {
            textAlign: value?.representation === "number" ? "left" : "center",
        },
        iconContainer: {
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : undefined,
        },
        icon: {
            color:
                enabledRepresentations?.length === 1
                    ? color.textPrimary
                    : undefined,
        },
    });
    return styles;
};
