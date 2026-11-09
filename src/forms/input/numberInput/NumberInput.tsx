import { type FC, type Ref, useImperativeHandle } from "react";
import { StyleSheet, View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../../icons/componentIconAssets";
import { useComponent } from "../../../internal";
import { Text } from "../../../typography/text";
import {
    Field,
    FieldAction,
    type FieldComponentProps,
    FieldNumberInput,
    type FieldNumberInputProps,
    FieldRow,
    FieldSurface,
} from "../../field";
import { SegmentedInputSegments } from "../shared/SegmentedInputSegments";
import {
    type SegmentedInputHandle,
    useSegmentedInputNavigation,
} from "../shared/useSegmentedInputNavigation";
import {
    getClearedNumberInputValue,
    getNextMode,
    getNextValue,
    getNumberInputSegmentStepValue,
    getNumberInputSegments,
    updateNumberInputSegment,
} from "./helpers";
import type { NumberInputTheme } from "./NumberInput.theme";

export type NumberInputHandle = SegmentedInputHandle & {
    clear: () => void;
};

export type NumberValue = { representation: "number"; value: string };
export type RangeValue = { representation: "range"; value: [string, string] };
export type FractionValue = {
    representation: "fraction";
    value: [string, string, string];
};

export type Representations = "number" | "fraction" | "range";

export type NumberInputValue = NumberValue | FractionValue | RangeValue;

export type NumberInputPlaceholders = {
    value?: string;
    start?: string;
    end?: string;
    whole?: string;
    numerator?: string;
    denominator?: string;
};

export type NumberInputIcons = ComponentIconAssets<Representations>;

export type NumberInputProps = FieldComponentProps &
    Pick<
        FieldNumberInputProps,
        | "maxLength"
        | "onSubmitEditing"
        | "returnKeyType"
        | "enterKeyHint"
        | "submitBehavior"
    > & {
        keyboardType?: "decimal-pad" | "number-pad";
        enabledRepresentations?: Representations[];
        value?: NumberInputValue;
        placeholder?: NumberInputPlaceholders;
        ref?: Ref<NumberInputHandle>;
        theme?: DeepPartial<NumberInputTheme>;
        onChange?: (e: NumberInputValue) => void;
    };

const DEFAULT_ENABLED_REPRESENTATIONS: Representations[] = [
    "number",
    "fraction",
    "range",
];

const DEFAULT_VALUE: NumberInputValue = {
    representation: "number",
    value: "",
};

/**
 * Segmented numeric input.
 *
 * ArrowUp/ArrowDown step the focused segment. Segments use ArrowLeft/
 * ArrowRight and Backspace navigation. The final segment uses `returnKeyType`,
 * `enterKeyHint`, and `submitBehavior`.
 */
export const NumberInput: FC<NumberInputProps> = ({
    keyboardType = "number-pad",
    enabledRepresentations = DEFAULT_ENABLED_REPRESENTATIONS,
    placeholder,
    maxLength,
    value = DEFAULT_VALUE,
    onChange,
    onSubmitEditing,
    returnKeyType,
    enterKeyHint,
    submitBehavior,
    ref,
    disabled,
    readOnly,
    theme: themeOverrides,
    ...fieldProps
}) => {
    const { icons, theme } = useComponent("numberInput", { themeOverrides });

    const getPlaceholder = (key: keyof NumberInputPlaceholders) =>
        placeholder?.[key] ?? placeholder?.value;

    const icon = icons[value.representation];
    const segments = getNumberInputSegments({
        value,
        getPlaceholder,
        keyboardType,
    });
    const { getSegmentInputProps, focusSegment, blurSegments } =
        useSegmentedInputNavigation({
            segments,
            onSubmitEditing,
            finalReturnKeyType: returnKeyType,
            finalEnterKeyHint: enterKeyHint,
            finalSubmitBehavior: submitBehavior,
        });

    useImperativeHandle(
        ref,
        () => ({
            focus: () => {
                if (!disabled) {
                    focusSegment("primary");
                }
            },
            blur: blurSegments,
            clear: () => {
                if (disabled || readOnly || !onChange) return;

                onChange(getClearedNumberInputValue(value.representation));
            },
        }),
        [
            blurSegments,
            disabled,
            focusSegment,
            onChange,
            readOnly,
            value.representation,
        ],
    );

    const handleChangeMode = () => {
        const nextMode = getNextMode(
            enabledRepresentations,
            value.representation,
        );
        if (!nextMode) return;

        const nextValue = getNextValue(nextMode, value);
        if (!nextValue) return;

        onChange?.(nextValue);
    };

    return (
        <Field disabled={disabled} readOnly={readOnly} {...fieldProps}>
            <FieldSurface theme={theme.surface}>
                <FieldRow>
                    <FieldAction
                        {...icon}
                        accessibilityLabel="Switch number format"
                        onPress={
                            enabledRepresentations.length > 1 && onChange
                                ? handleChangeMode
                                : undefined
                        }
                    />
                    <SegmentedInputSegments
                        segments={segments}
                        keyExtractor={(segment) =>
                            `${value.representation}-${segment.key}`
                        }
                        renderSegment={(segment, index) => (
                            <>
                                {!!segment.separator && (
                                    <View style={styles.separator}>
                                        <Text variant="title">
                                            {segment.separator}
                                        </Text>
                                    </View>
                                )}
                                <FieldNumberInput
                                    {...segment.inputProps}
                                    {...getSegmentInputProps(segment.key)}
                                    theme={theme.input}
                                    value={segment.value}
                                    maxLength={maxLength}
                                    style={[
                                        styles.input,
                                        value.representation !== "number" &&
                                            styles.centered,
                                    ]}
                                    onStep={
                                        onChange
                                            ? (direction) =>
                                                  onChange(
                                                      getNumberInputSegmentStepValue(
                                                          value,
                                                          index,
                                                          direction,
                                                      ),
                                                  )
                                            : undefined
                                    }
                                    onChangeText={(text) =>
                                        onChange?.(
                                            updateNumberInputSegment(
                                                value,
                                                index,
                                                text,
                                            ),
                                        )
                                    }
                                />
                            </>
                        )}
                    />
                </FieldRow>
            </FieldSurface>
        </Field>
    );
};

const styles = StyleSheet.create({
    input: {
        flexGrow: 1,
        flexBasis: 0,
    },
    centered: {
        textAlign: "center",
    },
    separator: {
        justifyContent: "center",
    },
});
