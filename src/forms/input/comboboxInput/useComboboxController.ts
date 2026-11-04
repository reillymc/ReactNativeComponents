import { type RefObject, useEffect, useRef, useState } from "react";
import type {
    BlurEvent,
    TextInput as DefaultTextInput,
    FocusEvent,
    TextInputKeyPressEvent,
} from "react-native";

import type { FieldTextInputProps } from "../../field";
import type { ValueItem } from "../valueItem";
import { type ComboboxValue, filterComboboxItems, getItemKey } from "./helpers";

type ComboboxValueChangeReason = "select" | "deselect";

type ComboboxInputChangeReason =
    | "input"
    | "select"
    | "commit"
    | "revert"
    | "clear";

type ComboboxSubmitReason = "select" | "custom" | "empty";

export type ComboboxSelectBehavior = "blurAndClose" | "close" | "keepOpen";

export interface ComboboxValueChangeDetails<T> {
    /** The selected item key, or `undefined` when the selection is cleared. */
    value: ComboboxValue<T> | undefined;
    /** The selected item, or `undefined` when the selection is cleared. */
    item: ValueItem<T> | undefined;
    reason: ComboboxValueChangeReason;
}

export interface ComboboxInputChangeDetails {
    inputValue: string;
    reason: ComboboxInputChangeReason;
}

export interface ComboboxSubmitDetails<T> {
    /** The resolved key of the submitted item, or `undefined` for custom/empty. */
    value: ComboboxValue<T> | undefined;
    /** The resolved item, or `undefined` for custom/empty submissions. */
    item: ValueItem<T> | undefined;
    inputValue: string;
    reason: ComboboxSubmitReason;
}

type ExpectedValueChange<T> = {
    value: ComboboxValue<T> | undefined;
};

type SubmitResolution<T> =
    | { type: "item"; item: ValueItem<T> }
    | { type: "custom"; customValue: string }
    | { type: "selected"; item: ValueItem<T> | undefined };

const resolveSubmit = <T>({
    showContainer,
    activeIndex,
    filteredItems,
    query,
    selectedItem,
    allowsCustomValue,
}: {
    showContainer: boolean;
    activeIndex: number;
    filteredItems: Array<ValueItem<T>>;
    query: string;
    selectedItem: ValueItem<T> | undefined;
    allowsCustomValue: boolean;
}): SubmitResolution<T> => {
    const highlightedItem =
        showContainer && activeIndex >= 0
            ? filteredItems[activeIndex]
            : undefined;

    if (highlightedItem) {
        return { type: "item", item: highlightedItem };
    }

    const customValue = query.trim();

    if (
        allowsCustomValue &&
        customValue &&
        customValue !== selectedItem?.label.trim()
    ) {
        return { type: "custom", customValue };
    }

    return { type: "selected", item: selectedItem };
};

export type ComboboxControllerOptions<T> = {
    items: Array<ValueItem<T>>;
    value: ComboboxValue<T> | undefined;
    defaultValue: ComboboxValue<T> | undefined;
    isValueControlled: boolean;
    inputValue: string | undefined;
    defaultInputValue: string | undefined;
    isInputControlled: boolean;
    interactive: boolean;
    onChange?: (details: ComboboxValueChangeDetails<T>) => void;
    onInputChange?: (details: ComboboxInputChangeDetails) => void;
    onSubmit?: (details: ComboboxSubmitDetails<T>) => void;
    onFocus?: FieldTextInputProps["onFocus"];
    onBlur?: FieldTextInputProps["onBlur"];
    onKeyPress?: FieldTextInputProps["onKeyPress"];
    selectBehavior: ComboboxSelectBehavior;
    disableOpenOnFocus: boolean;
    allowsCustomValue: boolean;
    submitOnEnter: boolean;
    filterItems?: (item: ValueItem<T>, query: string) => boolean;
    minimumSearchLength: number;
    maxSuggestionCount?: number;
    inputRef: RefObject<DefaultTextInput | null>;
    isMenuInverted?: boolean;
};

export const useComboboxController = <T>({
    items,
    value,
    defaultValue,
    isValueControlled,
    inputValue,
    defaultInputValue,
    isInputControlled,
    interactive,
    onChange,
    onInputChange,
    onSubmit,
    onFocus,
    onBlur,
    onKeyPress,
    selectBehavior,
    disableOpenOnFocus,
    allowsCustomValue,
    submitOnEnter,
    filterItems,
    minimumSearchLength,
    maxSuggestionCount,
    inputRef,
    isMenuInverted,
}: ComboboxControllerOptions<T>) => {
    const [selectedKey, setSelectedKey] = useControlledState<ComboboxValue<T>>(
        isValueControlled,
        value,
        defaultValue,
    );
    const [inputText, setInputText] = useState<string | undefined>(
        defaultInputValue,
    );
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const skipBlurRef = useRef(false);
    const previousValueRef = useRef(value);
    const expectedValueChangeRef = useRef<ExpectedValueChange<T> | undefined>(
        undefined,
    );

    useEffect(() => {
        const previousValue = previousValueRef.current;
        if (previousValue === value) return;

        previousValueRef.current = value;

        const expectedChange = expectedValueChangeRef.current;
        expectedValueChangeRef.current = undefined;

        if (expectedChange && expectedChange.value === value) {
            return;
        }

        if (!isInputControlled) {
            setInputText(undefined);
        }
    }, [isInputControlled, value]);

    useEffect(() => {
        if (!interactive) {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    }, [interactive]);

    const selectedItem = items.find((item) => getItemKey(item) === selectedKey);

    const isInputCleared = isInputControlled
        ? (inputValue ?? "") === ""
        : inputText === "";
    const query = isInputControlled ? (inputValue ?? "") : (inputText ?? "");
    const displayText = isInputControlled
        ? (inputValue ?? "")
        : (inputText ?? selectedItem?.label ?? "");

    const { filteredItems, meetsMinimum } = filterComboboxItems(items, query, {
        filterItems,
        maxSuggestionCount,
        minimumSearchLength,
    });

    const showContainer = isOpen && meetsMinimum && filteredItems.length > 0;
    const selectedIndex =
        selectedKey === undefined
            ? -1
            : filteredItems.findIndex(
                  (item) => getItemKey(item) === selectedKey,
              );
    const initialActiveIndex = selectedIndex >= 0 ? selectedIndex : 0;

    useEffect(() => {
        if (!showContainer || filteredItems.length === 0) {
            if (activeIndex !== -1) {
                setActiveIndex(-1);
            }
            return;
        }

        if (activeIndex < 0) {
            if (!isInputCleared) {
                setActiveIndex(0);
            }
            return;
        }

        if (activeIndex >= filteredItems.length) {
            setActiveIndex(filteredItems.length - 1);
        }
    }, [activeIndex, filteredItems.length, isInputCleared, showContainer]);

    const revertText = () => {
        const fallback = selectedItem?.label ?? "";

        if (!isInputControlled) {
            setInputText(undefined);
        }

        if (displayText !== fallback) {
            onInputChange?.({ inputValue: fallback, reason: "revert" });
        }
    };

    const settleText = () => {
        const customValue = query.trim();

        if (
            allowsCustomValue &&
            customValue &&
            customValue !== selectedItem?.label.trim()
        ) {
            commitCustomValue(customValue, true);
            return;
        }

        revertText();
    };

    const selectItem = (item: ValueItem<T>) => {
        if (!interactive) return;

        const nextKey = getItemKey(item);

        setSelectedKey(nextKey);
        expectedValueChangeRef.current = { value: nextKey };
        onChange?.({ value: nextKey, item, reason: "select" });

        if (!isInputControlled) {
            setInputText(undefined);
        }

        onInputChange?.({ inputValue: item.label, reason: "select" });
        setActiveIndex(-1);

        const shouldBlur = selectBehavior === "blurAndClose";
        const shouldClose = selectBehavior !== "keepOpen";

        if (shouldClose) {
            setIsOpen(false);
        }

        if (shouldBlur) {
            skipBlurRef.current = true;
            inputRef.current?.blur();
        }
    };

    const commitCustomValue = (
        customValue: string,
        notifyInputChange: boolean,
    ) => {
        if (!interactive) return;

        if (selectedKey !== undefined) {
            setSelectedKey(undefined);
            expectedValueChangeRef.current = { value: undefined };
            onChange?.({
                value: undefined,
                item: undefined,
                reason: "deselect",
            });
        }

        if (!isInputControlled) {
            setInputText(customValue);
        }

        if (notifyInputChange) {
            onInputChange?.({ inputValue: customValue, reason: "commit" });
        }

        setActiveIndex(-1);
        setIsOpen(false);
    };

    const handleFocus: NonNullable<FieldTextInputProps["onFocus"]> = (
        e: FocusEvent,
    ) => {
        setIsFocused(true);
        skipBlurRef.current = false;
        const shouldOpen = interactive && !disableOpenOnFocus;
        setIsOpen(shouldOpen);
        setActiveIndex(shouldOpen ? initialActiveIndex : -1);
        onFocus?.(e);
    };

    const handleBlur: NonNullable<FieldTextInputProps["onBlur"]> = (
        e: BlurEvent,
    ) => {
        setIsFocused(false);
        setIsOpen(false);
        setActiveIndex(-1);

        if (!interactive) {
            onBlur?.(e);
            return;
        }

        if (skipBlurRef.current) {
            skipBlurRef.current = false;
            onBlur?.(e);
            return;
        }

        settleText();
        onBlur?.(e);
    };

    const updateInputText = (next: string) => {
        if (!interactive) return;

        skipBlurRef.current = false;
        setIsOpen(true);

        if (!isInputControlled) {
            setInputText(next);
        }

        if (next === "") {
            if (selectedKey !== undefined) {
                setSelectedKey(undefined);
                expectedValueChangeRef.current = { value: undefined };
                onChange?.({
                    value: undefined,
                    item: undefined,
                    reason: "deselect",
                });
            }

            onInputChange?.({ inputValue: next, reason: "clear" });
            setActiveIndex(-1);
            return;
        }

        onInputChange?.({ inputValue: next, reason: "input" });
        setActiveIndex(0);
    };

    const handleArrowDown = (e: TextInputKeyPressEvent) => {
        if (!interactive) return;

        e.preventDefault?.();
        const itemCount = filteredItems.length;

        if (!showContainer) {
            if (itemCount > 0 && meetsMinimum) {
                setIsOpen(true);
                setActiveIndex(initialActiveIndex);
            }
            return;
        }

        setActiveIndex((prev) =>
            Math.min(
                Math.max(prev + (isMenuInverted ? -1 : 1), 0),
                itemCount - 1,
            ),
        );
    };

    const handleArrowUp = (e: TextInputKeyPressEvent) => {
        if (!interactive) return;

        e.preventDefault?.();

        if (!showContainer) return;

        const itemCount = filteredItems.length;
        const step = isMenuInverted ? 1 : -1;
        setActiveIndex((prev) =>
            Math.min(Math.max(prev + step, 0), itemCount - 1),
        );
    };

    const handleKeyPress: NonNullable<FieldTextInputProps["onKeyPress"]> = (
        e,
    ) => {
        if (!interactive) {
            onKeyPress?.(e);
            return;
        }

        switch (e.nativeEvent.key) {
            case "ArrowDown":
                handleArrowDown(e);
                return;
            case "ArrowUp":
                handleArrowUp(e);
                return;
            case "Escape":
                setIsOpen(false);
                setActiveIndex(-1);
                revertText();
                return;
            default:
                onKeyPress?.(e);
        }
    };

    const blurInput = () => {
        skipBlurRef.current = true;
        inputRef.current?.blur();
    };

    const submitItem = (item: ValueItem<T>) => {
        selectItem(item);

        if (!submitOnEnter) return;

        onSubmit?.({
            value: getItemKey(item),
            item,
            inputValue: item.label,
            reason: "select",
        });
    };

    const submitCustom = (customValue: string) => {
        commitCustomValue(customValue, customValue !== query);
        onSubmit?.({
            value: undefined,
            item: undefined,
            inputValue: customValue,
            reason: "custom",
        });
        blurInput();
    };

    const submitSelection = (item: ValueItem<T> | undefined) => {
        if (displayText !== (item?.label ?? "")) {
            revertText();
        }

        onSubmit?.({
            value: item ? getItemKey(item) : undefined,
            item,
            inputValue: item?.label ?? "",
            reason: item ? "select" : "empty",
        });
        blurInput();
    };

    const openMenu = () => {
        if (interactive) {
            setIsOpen(true);
            setActiveIndex(initialActiveIndex);
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
        setActiveIndex(-1);
    };

    const toggleMenu = () => {
        if (!interactive) return;

        if (isOpen) {
            closeMenu();
            return;
        }

        openMenu();
    };

    const handlePress = () => {
        if (isFocused) {
            toggleMenu();
        }
    };

    const handleSubmitEditing: NonNullable<
        FieldTextInputProps["onSubmitEditing"]
    > = () => {
        if (!interactive) return;

        const resolution = resolveSubmit({
            showContainer,
            activeIndex,
            filteredItems,
            query,
            selectedItem,
            allowsCustomValue,
        });

        if (resolution.type === "item") {
            submitItem(resolution.item);
            return;
        }

        if (resolution.type === "custom") {
            submitCustom(resolution.customValue);
            return;
        }

        submitSelection(resolution.item);
    };

    return {
        displayText,
        query,
        filteredItems,
        showContainer,
        activeIndex,
        handleFocus,
        handleBlur,
        handleKeyPress,
        handleSubmitEditing,
        selectItem,
        updateInputText,
        open: openMenu,
        close: closeMenu,
        handlePress,
    };
};

const useControlledState = <T>(
    isControlled: boolean,
    value: T | undefined,
    defaultValue: T | undefined,
) => {
    const [internalValue, setInternalValue] = useState<T | undefined>(
        defaultValue,
    );

    const currentValue = isControlled ? value : internalValue;

    const setValue = (nextValue: T | undefined) => {
        if (!isControlled) {
            setInternalValue(nextValue);
        }
    };

    return [currentValue, setValue] as const;
};
