import { type Ref, useEffect, useMemo, useState } from "react";
import type {
    TextInput as DefaultTextInput,
    NativeSyntheticEvent,
    TextInputFocusEventData,
} from "react-native";

import { useForwardedRef } from "../../hooks";
import type { ValueItem } from "../../types";
import { FloatingContainer, type FloatingContainerProps } from "../container";
import { Menu, MenuItem } from "../menu";
import { InputBase, type InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";

export interface DropdownInputStyles {
    panelGap: number;
}

export type DropdownInputProps<T = string> = Pick<
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
    | "inputStyle"
> &
    Pick<
        InputScaffoldProps,
        "label" | "helpText" | "mandatory" | "hasError" | "containerStyle"
    > & {
        items?: Array<ValueItem<T>>;
        selectedItem?: ValueItem<T>;

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

        ref?: Ref<DefaultTextInput | null>;
    };

export const DropdownInput = <T,>({
    items = [],
    selectedItem,
    minimumSearchLength = 1,
    maxSuggestionCount = 5,
    selectBehaviour = "blurAndSelect",
    panelPosition,
    onSelect,
    onChangeText,
    onBlur,
    ref,
    label,
    helpText,
    hasError,
    mandatory,
    containerStyle,
    ...props
}: DropdownInputProps<T>) => {
    const [searchValue, setSearchValue] = useState(selectedItem?.label ?? "");
    const [hasFocus, setHasFocus] = useState(false);

    const inputRef = useForwardedRef(ref);

    useEffect(() => {
        if (!selectedItem) return;
        setSearchValue(selectedItem?.label ?? "");
    }, [selectedItem]);

    const handleFocus = () => {
        setHasFocus(true);
    };

    const handleSelect: DropdownInputProps<T>["onSelect"] = (e) => {
        onSelect(e);
        if (selectBehaviour === "blurAndSelect") {
            inputRef.current?.blur();
        }
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        const search = searchValue.toLowerCase();
        const existingItem = items.find(
            (item) => item.label.toLowerCase() === search,
        );
        if (existingItem) {
            onSelect(existingItem);
        }
        setHasFocus(false);
        onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
        setSearchValue(text);
        onChangeText?.(text);
        if (selectedItem) {
            onSelect(undefined);
        }
    };

    const filteredItems = useMemo(() => {
        const search = searchValue.toLowerCase();

        return items
            .filter((item) => {
                if (
                    selectedItem &&
                    "id" in item &&
                    "id" in selectedItem &&
                    item.id === selectedItem.id
                ) {
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
    }, [items, maxSuggestionCount, searchValue, selectedItem]);

    const showDropdownPanel =
        hasFocus &&
        !!filteredItems.length &&
        searchValue.length >= minimumSearchLength;

    return (
        <InputScaffold
            label={label}
            helpText={helpText}
            mandatory={mandatory}
            hasError={hasError}
            containerStyle={containerStyle}
        >
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
        </InputScaffold>
    );
};
