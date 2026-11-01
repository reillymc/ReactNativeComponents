import type { SegmentedInputDisplaySegment } from "../shared/useSegmentedInputNavigation";
import type {
    NumberInputPlaceholders,
    NumberInputValue,
    Representations,
} from "./NumberInput";

type NumberInputSegmentKey = "primary" | "secondary" | "tertiary";

export type NumberInputSegment =
    SegmentedInputDisplaySegment<NumberInputSegmentKey>;

const getValueParts = (value: NumberInputValue): string[] => {
    switch (value.representation) {
        case "number":
            return [value.value];
        case "range":
            return [value.value[0] ?? "", value.value[1] ?? ""];
        case "fraction":
            return [
                value.value[0] ?? "",
                value.value[1] ?? "",
                value.value[2] ?? "",
            ];
    }
};

const buildValue = (
    representation: Representations,
    [primary = "", secondary = "", tertiary = ""]: string[],
): NumberInputValue => {
    switch (representation) {
        case "number":
            return { representation: "number", value: primary };
        case "range":
            return { representation: "range", value: [primary, secondary] };
        case "fraction":
            return {
                representation: "fraction",
                value: [primary, secondary, tertiary],
            };
    }
};

export const getClearedNumberInputValue = (
    representation: Representations,
): NumberInputValue => buildValue(representation, []);

export const getNextMode = (
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

export const getNextValue = (
    nextMode: Representations,
    value: NumberInputValue,
): NumberInputValue | undefined => {
    if (nextMode === value.representation) return undefined;

    const [primary = ""] = getValueParts(value);

    switch (nextMode) {
        case "number":
            return { representation: "number", value: primary };
        case "fraction":
            return {
                representation: "fraction",
                value: [primary, "", ""],
            };
        case "range":
            return {
                representation: "range",
                value: [primary, ""],
            };
    }
};

export const getNumberInputSegments = ({
    value,
    getPlaceholder,
    keyboardType,
}: {
    value: NumberInputValue;
    getPlaceholder: (key: keyof NumberInputPlaceholders) => string | undefined;
    keyboardType: "decimal-pad" | "number-pad";
}): NumberInputSegment[] => {
    const [primary = "", secondary = "", tertiary = ""] = getValueParts(value);

    switch (value.representation) {
        case "number":
            return [
                {
                    key: "primary",
                    value: primary,
                    inputProps: {
                        accessibilityLabel: "Number",
                        placeholder: getPlaceholder("value"),
                        keyboardType,
                    },
                },
            ];
        case "range":
            return [
                {
                    key: "primary",
                    value: primary,
                    inputProps: {
                        accessibilityLabel: "Start",
                        placeholder: getPlaceholder("start"),
                        keyboardType,
                    },
                },
                {
                    key: "secondary",
                    value: secondary,
                    separator: "\u2212",
                    inputProps: {
                        accessibilityLabel: "End",
                        placeholder: getPlaceholder("end"),
                        keyboardType,
                    },
                },
            ];
        case "fraction":
            return [
                {
                    key: "primary",
                    value: primary,
                    inputProps: {
                        accessibilityLabel: "Whole",
                        placeholder: getPlaceholder("whole"),
                        keyboardType: "number-pad",
                    },
                },
                {
                    key: "secondary",
                    value: secondary,
                    inputProps: {
                        accessibilityLabel: "Numerator",
                        placeholder: getPlaceholder("numerator"),
                        keyboardType: "number-pad",
                    },
                },
                {
                    key: "tertiary",
                    value: tertiary,
                    separator: "/",
                    inputProps: {
                        accessibilityLabel: "Denominator",
                        placeholder: getPlaceholder("denominator"),
                        keyboardType: "number-pad",
                    },
                },
            ];
    }
};

export const updateNumberInputSegment = (
    value: NumberInputValue,
    segmentIndex: number,
    text: string,
): NumberInputValue => {
    const parts = getValueParts(value);
    parts[segmentIndex] = text;

    return buildValue(value.representation, parts);
};

const stepText = (text: string | undefined, direction: 1 | -1) => {
    const parsed = Number.parseFloat(text ?? "");
    const current = Number.isFinite(parsed) ? parsed : 0;

    return Math.max(0, current + direction).toString();
};

export const getNumberInputSegmentStepValue = (
    value: NumberInputValue,
    segmentIndex: number,
    direction: 1 | -1,
): NumberInputValue => {
    const parts = getValueParts(value);
    parts[segmentIndex] = stepText(parts[segmentIndex], direction);

    return buildValue(value.representation, parts);
};
