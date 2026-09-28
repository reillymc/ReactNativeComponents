import { type FC, type Ref, useCallback } from "react";
import {
    type TextInput as DefaultTextInput,
    StyleSheet,
    View,
} from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { Text } from "../text";
import { InputAction } from "./InputAction";
import { InputRowContainer } from "./InputRowContainer";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export type NumberValue = { representation: "number"; value: string };
export type RangeValue = { representation: "range"; value: [string, string] };
export type FractionValue = {
    representation: "fraction";
    value: [string, string, string];
};

type Representations = "number" | "fraction" | "range";

const getNextMode = (
    enabledRepresentations: Representations[],
    current: Representations,
) => {
    const currentIndex = enabledRepresentations.indexOf(current);
    const nextIndex =
        currentIndex + 1 >= enabledRepresentations.length
            ? 0
            : currentIndex + 1;
    return enabledRepresentations[nextIndex];
};

const getNextValue = (
    nextMode: Representations,
    { value, representation }: NumberInputValue,
): NumberInputValue | undefined => {
    if (nextMode === representation) return undefined;

    switch (nextMode) {
        case "number":
            return { representation: "number", value: value?.[0] ?? "" };
        case "fraction":
            return {
                representation: "fraction",
                value: [
                    value?.[0] ?? (typeof value === "string" ? value : ""),
                    "",
                    "",
                ],
            };
        case "range":
            return {
                representation: "range",
                value: [
                    value?.[0] ?? (typeof value === "string" ? value : ""),
                    "",
                ],
            };
    }
};

export type NumberInputValue = NumberValue | FractionValue | RangeValue;

const DEFAULT_ENABLED_REPRESENTATIONS: Representations[] = [
    "number",
    "fraction",
    "range",
];

const DEFAULT_VALUE: NumberInputValue = {
    representation: "number",
    value: "",
};

export type NumberInputIcons = ComponentIconAssets<
    "number" | "range" | "fraction"
>;

export interface NumberInputProps
    extends Pick<
            NumberInputBaseProps,
            | "disabled"
            | "placeholder"
            | "maxLength"
            | "onSubmitEditing"
            | "clearButtonMode"
            | "variant"
        >,
        InputScaffoldFieldProps {
    keyboardType?: "decimal-pad" | "number-pad";

    enabledRepresentations?: Representations[];

    value?: NumberInputValue;

    placeholder2?: string;

    ref?: Ref<DefaultTextInput | null>;

    onChange?: (e: NumberInputValue) => void;
}

export const NumberInput: FC<NumberInputProps> = ({
    keyboardType = "number-pad",
    enabledRepresentations = DEFAULT_ENABLED_REPRESENTATIONS,
    disabled = false,
    clearButtonMode,
    placeholder,
    placeholder2,
    maxLength,
    value = DEFAULT_VALUE,
    variant = "regular",
    onChange,
    onSubmitEditing,
    ref,
    ...baseProps
}) => {
    const [styles, { icons }] = useThemedStyles("numberInput", createStyles, {
        props: { value },
    });

    const icon = icons[value.representation];

    const handleChangeMode = useCallback(() => {
        const nextMode = getNextMode(
            enabledRepresentations,
            value.representation,
        );
        if (!nextMode) return;

        const nextValue = getNextValue(nextMode, value);
        if (!nextValue) return;

        onChange?.(nextValue);
    }, [enabledRepresentations, onChange, value]);

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
            <InputRowContainer disabled={disabled}>
                <InputAction
                    disabled={disabled}
                    variant={variant}
                    {...icon}
                    onPress={
                        enabledRepresentations.length > 1
                            ? handleChangeMode
                            : undefined
                    }
                />
                <NumberInputBase
                    ref={ref}
                    disabled={disabled}
                    variant={variant}
                    placeholder={
                        value.representation === "range"
                            ? placeholder2
                            : placeholder
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
                        variant={variant}
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
                            variant={variant}
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
            </InputRowContainer>
        </InputScaffold>
    );
};

const createStyles = (
    _: ThemedStyles,
    { value }: Required<Pick<NumberInputProps, "value">>,
) =>
    StyleSheet.create({
        input: {
            flexGrow: 1,
            flexBasis: 0,
            textAlign: value.representation === "number" ? "auto" : "center",
        },
        separator: {
            justifyContent: "center",
        },
    });
