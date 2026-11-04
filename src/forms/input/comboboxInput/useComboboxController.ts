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

type EditState<T> = {
    text: string;
    /** The selection key at the time the user last edited. */
    key: ComboboxValue<T> | undefined;
};

export type ComboboxControllerOptions<T> = {
    items: Array<ValueItem<T>>;
    value: ComboboxValue<T> | undefined;
    defaultValue: ComboboxValue<T> | undefined;
    isValueControlled: boolean;
    interactive: boolean;
    onChange?: (item: ValueItem<T> | undefined, inputValue: string) => void;
    onChangeText?: (text: string) => void;
    onFocus?: FieldTextInputProps["onFocus"];
    onBlur?: FieldTextInputProps["onBlur"];
    onKeyPress?: FieldTextInputProps["onKeyPress"];
    onSubmitEditing?: FieldTextInputProps["onSubmitEditing"];
    disableOpenOnFocus: boolean;
    allowsCustomValue: boolean;
    blurOnSelect: boolean;
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
    interactive,
    onChange,
    onChangeText,
    onFocus,
    onBlur,
    onKeyPress,
    onSubmitEditing,
    disableOpenOnFocus,
    allowsCustomValue,
    blurOnSelect,
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
    const [edit, setEdit] = useState<EditState<T>>();
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        if (!interactive) {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    }, [interactive]);

    const skipBlurRef = useRef(false);

    const selectedItem = items.find((item) => getItemKey(item) === selectedKey);

    // Editing is only active while the selection hasn't changed underneath it.
    const activeEdit =
        edit !== undefined && edit.key === selectedKey ? edit : undefined;
    const isInputCleared = edit?.text === "";
    const query = activeEdit?.text ?? "";
    const displayText = activeEdit
        ? activeEdit.text
        : (selectedItem?.label ?? "");

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
        setEdit(undefined);
        onChangeText?.(selectedItem?.label ?? "");
    };

    const settleText = () => {
        if (allowsCustomValue && query && query !== selectedItem?.label) {
            commitCustomValue(query);
            return;
        }

        revertText();
    };

    const selectItem = (item: ValueItem<T>) => {
        if (!interactive) return;

        setSelectedKey(getItemKey(item));
        onChange?.(item, item.label);
        setEdit(undefined);
        skipBlurRef.current = blurOnSelect;
        setActiveIndex(-1);
        setIsOpen(false);

        if (blurOnSelect) {
            inputRef.current?.blur();
        }
    };

    const commitCustomValue = (typed: string) => {
        if (!interactive) return;

        setSelectedKey(undefined);
        onChange?.(undefined, typed);
        setEdit({ text: typed, key: undefined });
        setActiveIndex(-1);
        setIsOpen(false);
    };

    const handleFocus: NonNullable<FieldTextInputProps["onFocus"]> = (
        e: FocusEvent,
    ) => {
        skipBlurRef.current = false;
        const shouldOpen = interactive && !disableOpenOnFocus;
        setIsOpen(shouldOpen);
        setActiveIndex(shouldOpen ? initialActiveIndex : -1);
        onFocus?.(e);
    };

    const handleBlur: NonNullable<FieldTextInputProps["onBlur"]> = (
        e: BlurEvent,
    ) => {
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
        onChangeText?.(next);

        if (next === "") {
            if (selectedKey !== undefined) {
                setSelectedKey(undefined);
                onChange?.(undefined, "");
            }

            setEdit({ text: "", key: undefined });
            setActiveIndex(-1);
            return;
        }

        setActiveIndex(0);
        setEdit({ text: next, key: selectedKey });
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

    const handleSubmitEditing: NonNullable<
        FieldTextInputProps["onSubmitEditing"]
    > = (e) => {
        if (!interactive) {
            onSubmitEditing?.(e);
            return;
        }

        const item =
            showContainer && activeIndex >= 0
                ? filteredItems[activeIndex]
                : undefined;

        if (item) {
            selectItem(item);
            return;
        }

        if (allowsCustomValue && query && query !== selectedItem?.label) {
            commitCustomValue(query);
            blurInput();
            return;
        }

        onSubmitEditing?.(e);
        inputRef.current?.blur();
    };

    const clear = () => {
        if (!interactive) return;

        setEdit(undefined);
        setIsOpen(false);
        setActiveIndex(-1);
        setSelectedKey(undefined);
        onChange?.(undefined, "");
        onChangeText?.("");
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
        clear,
        open: () => {
            if (interactive) {
                setIsOpen(true);
                setActiveIndex(initialActiveIndex);
            }
        },
        close: () => {
            setIsOpen(false);
            setActiveIndex(-1);
        },
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
