import React, { type FC, type Ref, useCallback } from "react";
import {
    type TextInput as DefaultTextInput,
    StyleSheet,
    View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { Text } from "../text";
import { InputAction } from "./InputAction";
import type { InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";
import { NumberInputBase } from "./NumberInputBase";

export type NumberValue = { representation: "number"; value: string };
export type RangeValue = { representation: "range"; value: [string, string] };
export type FractionValue = {
    representation: "fraction";
    value: [string, string, string];
};

export type NumberInputValue = NumberValue | FractionValue | RangeValue;

export interface NumberInputProps
    extends Pick<
            InputBaseProps,
            | "disabled"
            | "placeholder"
            | "maxLength"
            | "onSubmitEditing"
            | "clearButtonMode"
        >,
        Pick<InputScaffoldProps, "label" | "mandatory"> {
    keyboardType?: "decimal-pad" | "number-pad";

    enabledRepresentations?: ("number" | "fraction" | "range")[];

    value?: NumberInputValue;

    placeholder2?: string;

    ref?: Ref<DefaultTextInput | null>;

    onChange?: (e: NumberInputValue) => void;
}

export const NumberInput: FC<NumberInputProps> = ({
    keyboardType = "number-pad",
    enabledRepresentations = ["number", "fraction", "range"],
    disabled = false,
    clearButtonMode,
    placeholder,
    placeholder2,
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

    const handleChangeMode = useCallback(() => {
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

    const handlePrimaryInputChangeText = useCallback(
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
        <InputScaffold {...baseProps}>
            <View style={styles.container}>
                <InputAction
                    disabled={disabled}
                    iconName={icon}
                    iconSet={Octicons}
                    onPress={
                        enabledRepresentations.length > 1
                            ? handleChangeMode
                            : undefined
                    }
                />
                <NumberInputBase
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
                    inputStyle={styles.input}
                    onChangeText={handlePrimaryInputChangeText}
                    onSubmitEditing={
                        value.representation === "number"
                            ? onSubmitEditing
                            : undefined
                    }
                />
                {value.representation === "fraction" && (
                    <NumberInputBase
                        disabled={disabled}
                        placeholder={placeholder2}
                        value={value.value?.[1]}
                        maxLength={maxLength}
                        clearButtonMode={clearButtonMode}
                        keyboardType="number-pad"
                        inputStyle={styles.input}
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
                        <View style={styles.separator}>
                            <Text variant="title">
                                {value.representation === "fraction"
                                    ? "/"
                                    : "\u2212"}
                            </Text>
                        </View>
                        <NumberInputBase
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
                            inputStyle={styles.input}
                            onChangeText={(text) => {
                                if (value.representation === "fraction") {
                                    onChange?.({
                                        representation: value.representation,
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
        </InputScaffold>
    );
};

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    { value, disabled }: Required<Pick<NumberInputProps, "value" | "disabled">>,
) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            borderRadius: inputBase.container.borderRadius,
            overflow: "hidden",
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
        },
        primaryInput: {
            textAlign: value.representation === "range" ? "center" : "left",
            flexGrow: 1,
            flexBasis: 1,
        },
        input: {
            textAlign: value.representation === "number" ? "left" : "center",
            flexGrow: 1,
        },
        separator: {
            justifyContent: "center",
        },
    });
    return styles;
};
