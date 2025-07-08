import React, { type Ref, useMemo } from "react";
import type {
    TextInput as DefaultTextInput,
    NativeSyntheticEvent,
    TextInputFocusEventData,
} from "react-native";
import { ValidateString } from "@reillymc/es-utils";

import { useForwardedRef } from "../../hooks";
import type { ValueItem } from "../../types";
import { FloatingContainer } from "../container";
import { Menu, MenuItem } from "../menu";
import { InputBase, type InputBaseProps } from "./InputBase";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";

export interface DropdownInputStyles {
    panelGap: number;
}

export type DropdownInputProps<T = string> = Pick<
    InputBaseProps,
    | "autoCapitalize"
    | "autoCorrect"
    | "returnKeyType"
    | "returnKeyLabel"
    | "onBlur"
    | "placeholder"
    | "onChangeText"
    | "clearButtonMode"
    | "value"
    | "maxLength"
    | "onSubmitEditing"
    | "autoFocus"
    | "submitBehavior"
    | "disabled"
> &
    Pick<
        InputScaffoldProps,
        "label" | "helpText" | "mandatory" | "hasError" | "containerStyle"
    > & {
        items?: Array<ValueItem<T>>;
        selectedItem?: ValueItem<T>;

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

        /**
         * Callback on selection of valid dropdown value.
         * The automated flag indicates whether the selection was triggered by the user or by the component.
         * Selection is triggered by the component when the user enters a value that matches an existing item,
         * or clears out all text
         */
        onSelect: (e: ValueItem<T> | undefined, automated?: boolean) => void;

        ref?: Ref<DefaultTextInput | null>;
    };

export const DropdownInput = <T,>({
    items = [],
    selectedItem,
    minimumSearchLength = 1,
    maxSuggestionCount = 5,
    onSelect,
    onChangeText,
    onBlur,
    value,
    ref,
    label,
    helpText,
    hasError,
    mandatory,
    containerStyle,
    ...props
}: DropdownInputProps<T>) => {
    console.log(selectedItem);

    const [searchValue, setSearchValue] = React.useState(
        selectedItem?.label ?? value ?? "",
    );
    const [hasFocus, setHasFocus] = React.useState(false);

    const inputRef = useForwardedRef(ref);

    React.useEffect(() => {
        setSearchValue(selectedItem?.label ?? value ?? "");
    }, [selectedItem, value]);

    const handleFocus = () => {
        setHasFocus(true);
    };

    const handleSelect: DropdownInputProps<T>["onSelect"] = (e) => {
        onSelect(e);
        inputRef.current?.blur();
        setSearchValue(selectedItem?.label ?? value ?? "");
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onChangeText?.(e.nativeEvent.text.trim());

        const existingItem = items.find(
            (item) => item.label.toLowerCase() === searchValue.toLowerCase(),
        );
        if (existingItem) {
            handleSelect?.(existingItem, true);
        }
        setHasFocus(false);
        onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
        setSearchValue(text);
        onChangeText?.(text);

        if (!ValidateString(text)) {
            handleSelect?.(undefined, true);
        }
    };

    const filteredItems = useMemo(() => {
        const search = searchValue.toLowerCase();

        const filteredItems = items
            .filter(
                ({ label, description }) =>
                    label.toLowerCase().includes(search) ||
                    description?.toLowerCase().includes(search),
            )
            .slice(0, maxSuggestionCount);

        return filteredItems.reverse();
    }, [items, maxSuggestionCount, searchValue]);

    const showDropdownPanel =
        hasFocus &&
        searchValue.length >= minimumSearchLength &&
        selectedItem?.label.toLowerCase() !== searchValue.toLowerCase();

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
            />
            {showDropdownPanel && (
                <FloatingContainer parentRef={inputRef}>
                    {({ inverted }) => (
                        <Menu>
                            {(inverted
                                ? filteredItems.reverse()
                                : filteredItems
                            ).map((item) => (
                                <MenuItem
                                    key={"id" in item ? item.id : item.value}
                                    label={item.label}
                                    searchValue={searchValue}
                                    onPress={() => handleSelect(item)}
                                />
                            ))}
                        </Menu>
                    )}
                </FloatingContainer>
            )}
        </InputScaffold>
    );
};

DropdownInput.name = "DropdownInput";
