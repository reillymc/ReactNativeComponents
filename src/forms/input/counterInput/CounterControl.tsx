import type { FC } from "react";
import { StyleSheet } from "react-native";

import { useComponent } from "../../../internal";
import {
    FieldAction,
    FieldNumberInput,
    type FieldNumberInputProps,
    FieldRow,
    FieldSurface,
    useFieldControlState,
} from "../../field";
import type { CounterInputProps } from "./CounterInput";

export type CounterControlProps = {
    value?: string;
    onChange?: (value: string) => void;
    disableKeyboardInput?: boolean;
    interval: number;
    min: number;
    max: number;
    keyboardType: NonNullable<CounterInputProps["keyboardType"]>;
    placeholder?: string;
    maxLength?: number;
    onSubmitEditing?: FieldNumberInputProps["onSubmitEditing"];
};

export const CounterControl: FC<CounterControlProps> = ({
    value,
    onChange,
    disableKeyboardInput,
    interval,
    min,
    max,
    keyboardType,
    placeholder,
    maxLength,
    onSubmitEditing,
}) => {
    const { icons } = useComponent("counterInput");
    const { interactive } = useFieldControlState();
    const canChange = interactive && !!onChange;

    const parsedValue = Number.parseFloat(value ?? "");
    const numericValue = Number.isFinite(parsedValue) ? parsedValue : min;

    const clampValue = (next: number) => Math.min(Math.max(next, min), max);
    const changeBy = (delta: number) =>
        onChange?.(clampValue(numericValue + delta).toString());

    const handleBlur: NonNullable<FieldNumberInputProps["onBlur"]> = () => {
        if (!value) return;

        const parsed = Number.parseFloat(value);
        if (!Number.isFinite(parsed)) {
            onChange?.("");
            return;
        }

        const clamped = clampValue(parsed).toString();
        if (clamped !== value) {
            onChange?.(clamped);
        }
    };

    return (
        <FieldSurface>
            <FieldRow>
                <FieldAction
                    {...icons.decrease}
                    accessibilityLabel="Decrease"
                    tabIndex={-1}
                    onPress={canChange ? () => changeBy(-interval) : undefined}
                />
                <FieldNumberInput
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value ?? ""}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={canChange ? onChange : undefined}
                    onBlur={canChange ? handleBlur : undefined}
                    onStep={
                        canChange
                            ? (direction) => changeBy(direction * interval)
                            : undefined
                    }
                    readOnly={disableKeyboardInput}
                    style={styles.input}
                />
                <FieldAction
                    {...icons.increase}
                    accessibilityLabel="Increase"
                    tabIndex={-1}
                    onPress={canChange ? () => changeBy(interval) : undefined}
                />
            </FieldRow>
        </FieldSurface>
    );
};

const styles = StyleSheet.create({
    input: {
        flexGrow: 1,
        flexBasis: 0,
        textAlign: "center",
    },
});
