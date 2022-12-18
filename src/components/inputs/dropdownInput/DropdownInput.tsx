import React from "react";
import { TextInput as DefaultTextInput, ViewStyle } from "react-native";

import { BaseInput, BaseInputProps } from "../BaseInput";
import { TextInputProps } from "../TextInput";
import { DropdownItem } from "./DropdownItem";
import { DropdownPanel } from "./DropdownPanel";

export interface DropdownInputStyles {
    dropdownMarginTop: number;
}

export interface DropdownInputProps
    extends Pick<
            TextInputProps,
            "autoCapitalize" | "autoCorrect" | "returnKeyType" | "returnKeyLabel" | "onBlur" | "placeholder" | "width"
        >,
        BaseInputProps {
    items?: Array<DropdownItem>;
    selectedItem?: DropdownItem;

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

    style?: ViewStyle;

    /**
     * Callback on selection of valid dropdown value.
     */
    onSelect: (e: DropdownItem | undefined) => void;

    /**
     * If provided, will return the entered string to be used to create a new item in the case that
     * the item does not exist in the list.
     */
    onAdd?: (e: string) => void;
}

export const DropdownInput = React.forwardRef<DefaultTextInput, DropdownInputProps>(
    (
        {
            items = [],
            label,
            selectedItem,
            minimumSearchLength = 1,
            maxSuggestionCount = 5,
            onSelect,
            onChangeText,
            onAdd,
            width,
            value,
            ...props
        },
        ref,
    ) => {
        const [searchValue, setSearchValue] = React.useState(selectedItem?.label ?? value ?? "");
        const [hasFocus, setHasFocus] = React.useState(false);

        React.useEffect(() => {
            setSearchValue(selectedItem?.label ?? value ?? "");
        }, [selectedItem, value]);

        // const updateValue = (autoSelectHighlighted?: boolean) => {
        //     if (!IsValidString(searchValue)) {
        //         onSelect(undefined);
        //     }

        //     const item = items.find(({ label }) =>
        //         autoSelectHighlighted
        //             ? label.toLowerCase().includes(searchValue.toLowerCase())
        //             : label.toLowerCase() === searchValue.toLowerCase(),
        //     );
        //     if (item) {
        //         onSelect(item);
        //         return;
        //     }

        //     if (onAdd) {
        //         onAdd(searchValue);
        //     }
        // };

        const handleFocus = () => {
            setHasFocus(true);
        };

        const handleBlur = () => {
            setHasFocus(false);
            // updateValue(searchValue.length >= minimumSearchLength);
        };

        const handleChangeText = (text: string) => {
            setSearchValue(text);
            onChangeText?.(text);
        };

        const handleSubmitEditing = () => {
            // updateValue(true);
        };

        return (
            <BaseInput
                label={label}
                {...props}
                ref={ref}
                width={width}
                value={searchValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                onSubmitEditing={handleSubmitEditing}
                autoCorrect={false}
                panelElement={
                    <DropdownPanel
                        items={items}
                        maxSuggestionCount={maxSuggestionCount}
                        onSelect={onSelect}
                        searchValue={searchValue}
                        visible={hasFocus && searchValue.length >= minimumSearchLength}
                    />
                }
            />
        );
    },
);

DropdownInput.displayName = "DropdownInput";
