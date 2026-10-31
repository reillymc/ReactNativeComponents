import type { SegmentedInputDisplaySegment } from "../shared/useSegmentedInputNavigation";
import type { TimeInputPlaceholders, TimeInputValue } from "./TimeInput";

export type TimeInputSegmentKey = "hours" | "minutes";

export type TimeInputSegment =
    SegmentedInputDisplaySegment<TimeInputSegmentKey>;

export const DEFAULT_TIME_VALUE: TimeInputValue = {
    hours: "",
    minutes: "",
};

export const TIME_SEGMENT_MAX_LENGTH = 2;

const parseTimePart = (text: string | undefined) => {
    const parsed = Number.parseInt(text ?? "", 10);
    return Number.isFinite(parsed) ? parsed : 0;
};

type TimeInputSegmentsOptions = {
    value: TimeInputValue;
    placeholder?: TimeInputPlaceholders;
    onChange?: (e: TimeInputValue) => void;
};

export const getTimeInputSegments = ({
    value,
    placeholder,
    onChange,
}: TimeInputSegmentsOptions): TimeInputSegment[] => {
    const setTotalMinutes = (totalMinutes: number) => {
        const total = Math.max(0, totalMinutes);

        onChange?.({
            ...value,
            hours: Math.floor(total / 60).toString(),
            minutes: (total % 60).toString(),
        });
    };

    const stepHours = (direction: 1 | -1) => {
        const hours = Math.max(
            0,
            parseTimePart(value.hours) + direction,
        ).toString();
        onChange?.({ ...value, hours });
    };

    const handleHoursChangeText = (text: string) => {
        onChange?.({ ...value, hours: text });
    };

    const handleMinutesChangeText = (text: string) => {
        if (!text) {
            onChange?.({ ...value, minutes: "" });
            return;
        }

        setTotalMinutes(parseTimePart(value.hours) * 60 + parseTimePart(text));
    };

    const stepMinutes = (direction: 1 | -1) => {
        setTotalMinutes(
            parseTimePart(value.hours) * 60 +
                parseTimePart(value.minutes) +
                direction,
        );
    };

    return [
        {
            key: "hours",
            value: value.hours,
            separator: "h",
            inputProps: {
                accessibilityLabel: "Hours",
                placeholder: placeholder?.hours,
                onChangeText: handleHoursChangeText,
                onStep: onChange ? stepHours : undefined,
            },
        },
        {
            key: "minutes",
            value: value.minutes,
            separator: "m",
            inputProps: {
                accessibilityLabel: "Minutes",
                placeholder: placeholder?.minutes,
                onChangeText: handleMinutesChangeText,
                onStep: onChange ? stepMinutes : undefined,
            },
        },
    ];
};
