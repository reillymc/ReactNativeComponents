import { type RefObject, useDeferredValue, useState } from "react";
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
    textValue?: string;
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

const EMPTY_ITEMS: never[] = [];

type NormalizedItem<T> = {
    item: ValueItem<T>;
    label: string;
    description: string | undefined;
};

const isSelectableItem = <T,>(
    { item, label, description }: NormalizedItem<T>,
    search: string,
    selectedValue: unknown,
) => {
    const itemId = "id" in item ? item.id : item.value;

    if (selectedValue !== undefined && itemId === selectedValue) return false;
    if (label === search) return false;

    return label.includes(search) || !!description?.includes(search);
};

export const DropdownInputBase = <T,>({
    items = EMPTY_ITEMS,
    selectedValue,
    minimumSearchLength = 1,
    maxSuggestionCount = 5,
    selectBehaviour = "blurAndSelect",
    panelPosition,
    onSelect,
    textValue,
    onChangeText,
    onBlur,
    ref,
    ...props
}: DropdownInputBaseProps<T>) => {
    const [hasFocus, setHasFocus] = useState(false);

    const inputRef = useForwardedRef(ref);

    const normalizedItems: Array<NormalizedItem<T>> = items.map((item) => ({
        item,
        label: item.label.toLowerCase(),
        description: item.description?.toLowerCase(),
    }));

    const existingItem = normalizedItems.find(({ item }) => {
        if ("id" in item) {
            return item.id === selectedValue;
        }
        return item.value === selectedValue;
    });
    const existingItemLabel = existingItem?.item.label;

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

        if (selectBehaviour === "blurAndSelect") {
            inputRef.current?.blur();
        }
    };

    const inputText = textValue ?? existingItemLabel ?? "";

    const deferredInputText = useDeferredValue(inputText);
    const search = deferredInputText.toLowerCase();

    const handleBlur = (e: BlurEvent) => {
        const blurSearch = inputText.toLowerCase();
        const existingItem = normalizedItems.find(
            ({ label }) => label === blurSearch,
        )?.item;

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
        onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
        const didMatchSelection =
            selectedValue !== undefined &&
            existingItemLabel !== undefined &&
            text !== existingItemLabel;

        if (didMatchSelection) {
            onSelect(undefined);
        }

        onChangeText?.(text);
    };

    const isSelectionActive =
        selectedValue !== undefined &&
        existingItemLabel !== undefined &&
        inputText === existingItemLabel;

    const filteredItems: Array<ValueItem<T>> = [];
    for (const normalized of normalizedItems) {
        if (filteredItems.length >= maxSuggestionCount) break;

        if (isSelectableItem(normalized, search, selectedValue)) {
            filteredItems.push(normalized.item);
        }
    }

    const showDropdownPanel =
        hasFocus &&
        !isSelectionActive &&
        !!filteredItems.length &&
        inputText.length >= minimumSearchLength;

    return (
        <>
            <InputBase
                {...props}
                ref={inputRef}
                value={inputText}
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
                                searchValue={deferredInputText}
                                onPress={() => handleSelect(item)}
                            />
                        ))}
                    </Menu>
                )}
            </FloatingContainer>
        </>
    );
};
