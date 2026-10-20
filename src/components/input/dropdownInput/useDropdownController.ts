import { type RefObject, useRef, useState } from "react";
import type {
    BlurEvent,
    TextInput as DefaultTextInput,
    FocusEvent,
    TextInputKeyPressEvent,
} from "react-native";

import type { ValueItem } from "../../../common";
import { useControlledState } from "../../../hooks";
import type { InputBaseProps } from "../InputBase";
import { type DropdownValue, filterDropdownItems, getItemKey } from "./helpers";

type EditState<T> = {
    text: string;
    /** The selection key at the time the user last edited. */
    key: DropdownValue<T> | undefined;
};

export type DropdownControllerOptions<T> = {
    items: Array<ValueItem<T>>;
    value: DropdownValue<T> | undefined;
    defaultValue: DropdownValue<T> | undefined;
    isValueControlled: boolean;
    onChange?: (item: ValueItem<T> | undefined, inputValue: string) => void;
    onChangeText?: (text: string) => void;
    onFocus?: InputBaseProps["onFocus"];
    onBlur?: InputBaseProps["onBlur"];
    onKeyPress?: InputBaseProps["onKeyPress"];
    onSubmitEditing?: InputBaseProps["onSubmitEditing"];
    openOnFocus: boolean;
    allowsCustomValue: boolean;
    blurOnSelect: boolean;
    filterItems?: (item: ValueItem<T>, query: string) => boolean;
    minimumSearchLength: number;
    maxSuggestionCount?: number;
    inputRef: RefObject<DefaultTextInput | null>;
    isMenuInverted?: boolean;
};

export const useDropdownController = <T>({
    items,
    value,
    defaultValue,
    isValueControlled,
    onChange,
    onChangeText,
    onFocus,
    onBlur,
    onKeyPress,
    onSubmitEditing,
    openOnFocus,
    allowsCustomValue,
    blurOnSelect,
    filterItems,
    minimumSearchLength,
    maxSuggestionCount,
    inputRef,
    isMenuInverted,
}: DropdownControllerOptions<T>) => {
    const [selectedKey, setSelectedKey] = useControlledState<DropdownValue<T>>(
        isValueControlled,
        value,
        defaultValue,
    );
    const [edit, setEdit] = useState<EditState<T>>();
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const skipBlurRef = useRef(false);

    const selectedItem = items.find((item) => getItemKey(item) === selectedKey);

    // Editing is only active while the selection hasn't changed underneath it.
    const activeEdit =
        edit !== undefined && edit.key === selectedKey ? edit : undefined;
    const query = activeEdit?.text ?? "";
    const displayText = activeEdit
        ? activeEdit.text
        : (selectedItem?.label ?? "");

    const { filteredItems, meetsMinimum } = filterDropdownItems(items, query, {
        filterItems,
        maxSuggestionCount,
        minimumSearchLength,
    });

    const showContainer = isOpen && meetsMinimum && filteredItems.length > 0;

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
        setSelectedKey(undefined);
        onChange?.(undefined, typed);
        setEdit({ text: typed, key: undefined });
        setActiveIndex(-1);
        setIsOpen(false);
    };

    const handleFocus: NonNullable<InputBaseProps["onFocus"]> = (
        e: FocusEvent,
    ) => {
        skipBlurRef.current = false;
        setIsOpen(openOnFocus);
        onFocus?.(e);
    };

    const handleBlur: NonNullable<InputBaseProps["onBlur"]> = (
        e: BlurEvent,
    ) => {
        setIsOpen(false);
        setActiveIndex(-1);

        if (skipBlurRef.current) {
            skipBlurRef.current = false;
            onBlur?.(e);
            return;
        }

        settleText();
        onBlur?.(e);
    };

    const handleChangeText = (next: string) => {
        skipBlurRef.current = false;
        setIsOpen(true);
        setActiveIndex(-1);
        onChangeText?.(next);

        // Clear the selection as soon as the text diverges from the selected
        // label, so `value` never references an item that isn't displayed.
        const diverged =
            selectedKey !== undefined && next !== selectedItem?.label;

        if (diverged) {
            setSelectedKey(undefined);
            onChange?.(undefined, next);
        }

        setEdit({ text: next, key: diverged ? undefined : selectedKey });
    };

    const handleArrowDown = (e: TextInputKeyPressEvent) => {
        e.preventDefault?.();
        const itemCount = filteredItems.length;

        if (!showContainer) {
            if (itemCount > 0 && meetsMinimum) {
                setIsOpen(true);
                setActiveIndex(0);
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
        e.preventDefault?.();

        if (!showContainer) return;

        const itemCount = filteredItems.length;
        const step = isMenuInverted ? 1 : -1;
        setActiveIndex((prev) =>
            Math.min(Math.max(prev + step, 0), itemCount - 1),
        );
    };

    const handleKeyPress: NonNullable<InputBaseProps["onKeyPress"]> = (e) => {
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
        InputBaseProps["onSubmitEditing"]
    > = (e) => {
        const item =
            showContainer && activeIndex >= 0
                ? filteredItems[activeIndex]
                : undefined;

        if (item) {
            selectItem(item);

            if (!blurOnSelect) {
                blurInput();
            }
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

    const setInputValue = (next: string) => {
        skipBlurRef.current = false;
        setEdit({ text: next, key: selectedKey });
        setIsOpen(true);
        setActiveIndex(-1);
        onChangeText?.(next);
    };

    const clear = () => {
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
        handleChangeText,
        handleKeyPress,
        handleSubmitEditing,
        selectItem,
        setInputValue,
        clear,
        open: () => setIsOpen(true),
        close: () => {
            setIsOpen(false);
            setActiveIndex(-1);
        },
    };
};
