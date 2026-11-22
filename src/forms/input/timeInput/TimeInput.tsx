import { type FC, type Ref, useImperativeHandle } from "react";
import { Pressable } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../../icons/componentIconAssets";
import { defineStyles, useComponent } from "../../../internal";
import { Text } from "../../../typography/text";
import {
    Field,
    type FieldComponentProps,
    FieldIcon,
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
    DEFAULT_TIME_VALUE,
    getTimeInputSegments,
    TIME_SEGMENT_MAX_LENGTH,
} from "./helpers";
import type { TimeInputTheme } from "./TimeInput.theme";

export type TimeInputValue = { hours: string; minutes: string };

export type TimeInputHandle = SegmentedInputHandle & {
    clear: () => void;
};

export type TimeInputIcons = ComponentIconAssets<"time">;

export type TimeInputPlaceholders = {
    hours?: string;
    minutes?: string;
};

export type TimeInputProps = FieldComponentProps &
    Pick<
        FieldNumberInputProps,
        "onSubmitEditing" | "returnKeyType" | "enterKeyHint" | "submitBehavior"
    > & {
        value?: TimeInputValue;
        placeholder?: TimeInputPlaceholders;
        ref?: Ref<TimeInputHandle>;
        theme?: DeepPartial<TimeInputTheme>;
        onChange?: (e: TimeInputValue) => void;
    };

/**
 * Hours and minutes input.
 *
 * ArrowUp/ArrowDown step the focused segment; minute steps roll over. Segments
 * use ArrowLeft/ArrowRight and Backspace navigation. The final segment uses
 * `returnKeyType`, `enterKeyHint`, and `submitBehavior`.
 */
export const TimeInput: FC<TimeInputProps> = ({
    placeholder,
    value = DEFAULT_TIME_VALUE,
    onChange,
    onSubmitEditing,
    returnKeyType,
    enterKeyHint,
    submitBehavior,
    disabled,
    readOnly,
    ref,
    theme: themeOverrides,
    ...fieldProps
}) => {
    const { icons, styles, theme } = useComponent("timeInput", {
        themeOverrides,
        createStyles,
    });
    const { theme: fieldTheme } = useComponent("field");
    const segments = getTimeInputSegments({
        value,
        placeholder,
        onChange,
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
                    focusSegment("hours");
                }
            },
            blur: blurSegments,
            clear: () => {
                if (disabled || readOnly || !onChange) return;

                onChange(DEFAULT_TIME_VALUE);
            },
        }),
        [blurSegments, disabled, focusSegment, onChange, readOnly],
    );

    return (
        <Field disabled={disabled} readOnly={readOnly} {...fieldProps}>
            <FieldSurface theme={theme.surface}>
                <FieldRow>
                    <Pressable
                        accessible={false}
                        focusable={false}
                        disabled={disabled || readOnly}
                        aria-hidden
                        tabIndex={-1}
                        onPress={() => focusSegment("hours")}
                    >
                        <FieldIcon {...icons.time} />
                    </Pressable>
                    <SegmentedInputSegments
                        segments={segments}
                        style={{ paddingRight: fieldTheme.surface.padding }}
                        renderSegment={(segment) => (
                            <>
                                <FieldNumberInput
                                    {...segment.inputProps}
                                    {...getSegmentInputProps(segment.key)}
                                    theme={theme.input}
                                    value={segment.value}
                                    style={styles.input}
                                    keyboardType="number-pad"
                                    maxLength={TIME_SEGMENT_MAX_LENGTH}
                                />
                                {!!segment.separator && (
                                    <Pressable
                                        accessible={false}
                                        focusable={false}
                                        disabled={disabled}
                                        onPress={() =>
                                            focusSegment(segment.key)
                                        }
                                        style={styles.unitLabel}
                                        tabIndex={-1}
                                    >
                                        <Text variant="body">
                                            {segment.separator}
                                        </Text>
                                    </Pressable>
                                )}
                            </>
                        )}
                    />
                </FieldRow>
            </FieldSurface>
        </Field>
    );
};

const createStyles = defineStyles((theme: TimeInputTheme) => ({
    input: {
        flexGrow: 1,
        flexBasis: 0,
        textAlign: "right",
    },
    unitLabel: {
        justifyContent: "center",
        paddingStart: theme.unitLabel.paddingStart,
    },
}));
