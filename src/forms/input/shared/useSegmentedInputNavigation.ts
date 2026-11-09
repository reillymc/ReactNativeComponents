import { type Ref, useEffect, useRef } from "react";
import type { TextInputInstance } from "react-native";

import { focusPreservingFocusVisible } from "../../../internal";
import type { FieldNumberInputProps } from "../../field";

type SegmentedInputSegment<K extends string = string> = {
    key: K;
    value: string;
};

type SegmentedInputProps = Omit<
    FieldNumberInputProps,
    "ref" | "onKeyPress" | "onSelectionChange" | "value"
>;

export type SegmentedInputDisplaySegment<K extends string = string> =
    SegmentedInputSegment<K> & {
        separator?: string;
        inputProps?: SegmentedInputProps;
    };

export type SegmentedInputHandle = {
    focus: () => void;
    blur: () => void;
};

type TextSelection = { start: number; end: number };

type KeyPressEvent = Parameters<
    NonNullable<FieldNumberInputProps["onKeyPress"]>
>[0];

const getEventSelection = (event: KeyPressEvent): TextSelection | null => {
    const target = event.currentTarget;

    if (
        target &&
        typeof target === "object" &&
        "selectionStart" in target &&
        typeof target.selectionStart === "number" &&
        "selectionEnd" in target &&
        typeof target.selectionEnd === "number"
    ) {
        return { start: target.selectionStart, end: target.selectionEnd };
    }

    return null;
};

const setCaretToEnd = (input: TextInputInstance, valueLength: number) => {
    if (input.setSelection) {
        input.setSelection(valueLength, valueLength);
        return;
    }

    if (
        "setSelectionRange" in input &&
        typeof input.setSelectionRange === "function"
    ) {
        input.setSelectionRange(valueLength, valueLength);
    }
};

const getTargetIndex = (
    pressedKey: string,
    currentIndex: number,
    valueLength: number,
) => {
    if (pressedKey === "ArrowRight") return currentIndex + 1;
    if (pressedKey === "ArrowLeft") return currentIndex - 1;
    if (pressedKey === "Backspace" && valueLength === 0) {
        return currentIndex - 1;
    }

    return -1;
};

const isCaretAtEdge = (
    pressedKey: string,
    selection: TextSelection,
    valueLength: number,
) =>
    pressedKey === "ArrowRight"
        ? selection.end >= valueLength
        : selection.start <= 0;

const shouldMoveFocus = (
    pressedKey: string,
    event: KeyPressEvent,
    fallbackSelection: TextSelection | null,
    valueLength: number,
) => {
    if (pressedKey === "Backspace") return true;

    const selection = getEventSelection(event) ?? fallbackSelection;

    return selection
        ? isCaretAtEdge(pressedKey, selection, valueLength)
        : false;
};

type SegmentedInputNavigationOptions<K extends string> = {
    segments: readonly SegmentedInputSegment<K>[];
    externalRefs?: Partial<Record<K, Ref<TextInputInstance>>>;
    onSubmitEditing?: FieldNumberInputProps["onSubmitEditing"];
    finalReturnKeyType?: FieldNumberInputProps["returnKeyType"];
    finalEnterKeyHint?: FieldNumberInputProps["enterKeyHint"];
    finalSubmitBehavior?: FieldNumberInputProps["submitBehavior"];
};

const toEnterKeyHint = (
    returnKeyType: FieldNumberInputProps["returnKeyType"],
): FieldNumberInputProps["enterKeyHint"] => {
    switch (returnKeyType) {
        case "done":
        case "go":
        case "next":
        case "search":
        case "send":
            return returnKeyType;
        default:
            return undefined;
    }
};

/**
 * Coordinates ordered field input slots. Tracks refs and selection, moves
 * focus with ArrowLeft/ArrowRight at text edges and Backspace from empty
 * slots, and preserves focus-ring modality.
 *
 * Next on non-final slots focuses the next slot without calling
 * `onSubmitEditing`; the final slot uses the caller's return-key configuration
 * and submits normally.
 */
export const useSegmentedInputNavigation = <K extends string>({
    segments,
    externalRefs,
    onSubmitEditing,
    finalReturnKeyType,
    finalEnterKeyHint,
    finalSubmitBehavior,
}: SegmentedInputNavigationOptions<K>) => {
    const inputNodes = useRef(new Map<K, TextInputInstance>());
    const selectionNodes = useRef(new Map<K, TextSelection>());
    const refCallbacks = useRef(
        new Map<K, (node: TextInputInstance | null) => void>(),
    );
    const externalRefsRef = useRef(externalRefs);

    useEffect(() => {
        externalRefsRef.current = externalRefs;
    }, [externalRefs]);

    const getInputRef = (key: K) => {
        const existing = refCallbacks.current.get(key);

        if (existing) return existing;

        const callback = (node: TextInputInstance | null) => {
            if (node) {
                inputNodes.current.set(key, node);
            } else {
                inputNodes.current.delete(key);
            }

            const external = externalRefsRef.current?.[key];

            if (typeof external === "function") {
                external(node);
            } else if (external) {
                external.current = node;
            }
        };

        refCallbacks.current.set(key, callback);

        return callback;
    };

    const handleKeyPress = (index: number, event: KeyPressEvent) => {
        const current = segments[index];

        if (!current) return;

        const pressedKey = event.nativeEvent.key;
        const isBackspace = pressedKey === "Backspace";
        const targetIndex = getTargetIndex(
            pressedKey,
            index,
            current.value.length,
        );
        const target = segments[targetIndex];

        if (!target) return;

        if (
            !shouldMoveFocus(
                pressedKey,
                event,
                selectionNodes.current.get(current.key) ?? null,
                current.value.length,
            )
        ) {
            return;
        }

        const targetInput = inputNodes.current.get(target.key);

        if (!targetInput) return;

        event.preventDefault?.();
        focusPreservingFocusVisible(targetInput);

        if (isBackspace) {
            setCaretToEnd(targetInput, target.value.length);
        }
    };

    const focusSegment = (key: K) =>
        focusPreservingFocusVisible(inputNodes.current.get(key) ?? null);

    const getSegmentInputProps = (key: K) => {
        const index = segments.findIndex((segment) => segment.key === key);
        const nextSegment = segments[index + 1];
        const isLast = !nextSegment;
        const returnKeyType: FieldNumberInputProps["returnKeyType"] = isLast
            ? (finalReturnKeyType ?? "done")
            : "next";
        const enterKeyHint: FieldNumberInputProps["enterKeyHint"] = isLast
            ? (finalEnterKeyHint ?? toEnterKeyHint(returnKeyType))
            : "next";
        const submitBehavior: FieldNumberInputProps["submitBehavior"] = isLast
            ? finalSubmitBehavior
            : "submit";

        const onSelectionChange: NonNullable<
            FieldNumberInputProps["onSelectionChange"]
        > = (event) => {
            selectionNodes.current.set(key, event.nativeEvent.selection);
        };

        const onKeyPress: NonNullable<FieldNumberInputProps["onKeyPress"]> = (
            event,
        ) => handleKeyPress(index, event);

        return {
            ref: getInputRef(key),
            onSelectionChange,
            onKeyPress,
            returnKeyType,
            enterKeyHint,
            submitBehavior,
            onSubmitEditing: nextSegment
                ? () => focusSegment(nextSegment.key)
                : onSubmitEditing,
        };
    };

    const blurSegments = () => {
        for (const node of inputNodes.current.values()) {
            node.blur();
        }
    };

    return { getSegmentInputProps, focusSegment, blurSegments };
};
