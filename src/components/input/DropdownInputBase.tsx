import { type RefObject, useEffect, useMemo, useState } from "react";
import type { BlurEvent, TextInput as DefaultTextInput } from "react-native";

import type {
    ValueItem,
    ValueItemComplex,
    ValueItemSimple,
} from "../../common";
import { useForwardedRef } from "../../hooks";
import { FloatingContainer, type FloatingContainerProps } from "../container";
import { Menu, MenuItem } from "../menu";
import { InputBase, type InputBaseProps } from "./InputBase";

export type DropdownInputBaseProps<T = string> = Pick<
    InputBaseProps,
    | "autoCapitalize"
    | "returnKeyType"
    | "returnKeyLabel"
    | "onBlur"
    | "placeholder"
    | "onChangeText"
    | "clearButtonMode"
    | "maxLength"
    | "onSubmitEditing"
    | "autoFocus"
    | "submitBehavior"
    | "disabled"
    | "variant"
    | "inputStyle"
> & {
    items?: Array<ValueItem<T>>;

    /**
     * The currently selected item.
     * If not provided, the input will be in an unselected state.
     */
    selectedValue?: T extends string | number
        ? ValueItemSimple<T>["value"]
        : ValueItemComplex<T>["id"];

    /**
     * Defines the behaviour when an item is selected.
     * - "select": Selects the item and keeps the input focused.
     * - "blurAndSelect": Selects the item and blurs the input.
     */
    selectBehaviour?: "select" | "blurAndSelect";

    /**
     * Minimum number of characters that need to be entered before the dropdown is shown.
     * @default 1
     */
    minimumSearchLength?: number;

    /**
     * Maximum number of dropdown items to show.
     * @default 5
     */
    maxSuggestionCount?: number;

    panelPosition?: FloatingContainerProps["position"];

    /**
     * Callback on selection (or clearing of selection) of valid dropdown value.
     */
    onSelect: (e: ValueItem<T> | undefined) => void;

    ref?: RefObject<DefaultTextInput | null>;
};

export const DropdownInputBase = <T,>({
    items = [],
    selectedValue,
    minimumSearchLength = 1,
    maxSuggestionCount = 5,
    selectBehaviour = "blurAndSelect",
    panelPosition,
    onSelect,
    onChangeText,
    onBlur,
    ref,
    ...props
}: DropdownInputBaseProps<T>) => {
    const [searchValue, setSearchValue] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const inputRef = useForwardedRef(ref);

    const existingItemLabel = useMemo(() => {
        const existingItem = items.find((item) => {
            if ("id" in item) {
                return item.id === selectedValue;
            }
            return item.value === selectedValue;
        }) as ValueItem<T> | undefined;

        return existingItem?.label;
    }, [items, selectedValue]);

    useEffect(() => {
        if (isTyping) {
            return;
        }

        if (existingItemLabel) {
            setSearchValue(existingItemLabel);
            return;
        }

        if (selectedValue === undefined) {
            setSearchValue("");
        }
    }, [existingItemLabel, selectedValue, isTyping]);

    const handleFocus = () => {
        setHasFocus(true);
    };

    const handleSelect = (item: ValueItem<T>) => {
        const selectedItemId = "id" in item ? item.id : item.value;
        const isAlreadySelected =
            selectedValue !== undefined && selectedValue === selectedItemId;

        if (!isAlreadySelected) {
            onSelect(item);
        }

        setSearchValue(item.label);
        setIsTyping(false);

        if (selectBehaviour === "blurAndSelect") {
            inputRef.current?.blur();
        }
    };

    const handleBlur = (e: BlurEvent) => {
        const search = searchValue.toLowerCase();
        const existingItem = items.find(
            (item) => item.label.toLowerCase() === search,
        );

        if (existingItem) {
            const existingItemId =
                "id" in existingItem ? existingItem.id : existingItem.value;
            const isAlreadySelected =
                selectedValue !== undefined && selectedValue === existingItemId;

            if (!isAlreadySelected) {
                onSelect(existingItem);
            }
        }

        setHasFocus(false);
        setIsTyping(false);
        onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
        setSearchValue(text);
        onChangeText?.(text);

        if (selectedValue !== undefined && !isTyping) {
            onSelect(undefined);
        }

        setIsTyping(true);
    };

    const isSelectionActive = selectedValue !== undefined && !isTyping;

    const filteredItems = useMemo(() => {
        const search = searchValue.toLowerCase();

        return items
            .filter((item) => {
                if (
                    selectedValue &&
                    "id" in item &&
                    item.id === selectedValue
                ) {
                    return false; // Exclude the currently selected item
                }

                if (selectedValue && item.value === selectedValue) {
                    return false; // Exclude the currently selected item
                }

                if (item.label.toLowerCase() === search) {
                    return false; // Exclude exact match of search value
                }

                const inSearch =
                    item.label.toLowerCase().includes(search) ||
                    item.description?.toLowerCase().includes(search);

                return inSearch;
            })
            .slice(0, maxSuggestionCount);
    }, [items, maxSuggestionCount, searchValue, selectedValue]);

    const showDropdownPanel =
        hasFocus &&
        !isSelectionActive &&
        !!filteredItems.length &&
        searchValue.length >= minimumSearchLength;

    return (
        <>
            <InputBase
                {...props}
                ref={inputRef}
                value={searchValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                autoCorrect={false}
                spellCheck={false}
            />
            <FloatingContainer
                parentRef={inputRef}
                show={showDropdownPanel}
                position={panelPosition}
            >
                {({ inverted }) => (
                    <Menu reverse={inverted}>
                        {filteredItems.map((item) => (
                            <MenuItem
                                key={"id" in item ? item.id : item.value}
                                label={item.label}
                                description={item.description}
                                searchValue={searchValue}
                                onPress={() => handleSelect(item)}
                            />
                        ))}
                    </Menu>
                )}
            </FloatingContainer>
        </>
    );
};
