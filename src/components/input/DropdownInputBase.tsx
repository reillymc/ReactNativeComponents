import { type RefObject, useMemo, useState } from "react";
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

export const DropdownInputBase = <T,>({
    items = [],
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

    const existingItemLabel = useMemo(() => {
        const existingItem = items.find((item) => {
            if ("id" in item) {
                return item.id === selectedValue;
            }
            return item.value === selectedValue;
        }) as ValueItem<T> | undefined;

        return existingItem?.label;
    }, [items, selectedValue]);

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

    const handleBlur = (e: BlurEvent) => {
        const search = inputText.toLowerCase();
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

    const filteredItems = useMemo(() => {
        const search = inputText.toLowerCase();

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
    }, [items, maxSuggestionCount, inputText, selectedValue]);

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
                                searchValue={inputText}
                                onPress={() => handleSelect(item)}
                            />
                        ))}
                    </Menu>
                )}
            </FloatingContainer>
        </>
    );
};
