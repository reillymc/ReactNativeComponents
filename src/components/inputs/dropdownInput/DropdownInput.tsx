import React from "react";
import { NativeSyntheticEvent, TextInput as DefaultTextInput, TextInputFocusEventData, ViewStyle } from "react-native";

import { IsValidString } from "../../../helpers";
import { BaseInput, BaseInputProps } from "../BaseInput";
import { TextInputProps } from "../TextInput";
import { ValueItem } from "../valueItem";

import { DropdownPanel, DropdownPanelProps } from "./DropdownPanel";

// Override forwardRef to allow generic typing.
declare module "react" {
    function forwardRef<T, P = Record<string, unknown>>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export interface DropdownInputStyles {
    dropdownMarginTop: number;
}

export type DropdownInputProps<T = string> = Pick<
    TextInputProps,
    "autoCapitalize" | "autoCorrect" | "returnKeyType" | "returnKeyLabel" | "onBlur" | "placeholder" | "width"
> &
    Pick<DropdownPanelProps, "hideItemDescriptions" | "searchInDescriptions"> &
    BaseInputProps & {
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

        style?: ViewStyle;

        /**
         * Callback on selection of valid dropdown value.
         * The automated flag indicates whether the selection was triggered by the user or by the component.
         * Selection is triggered by the component when the user enters a value that matches an existing item,
         * or clears out all text
         */
        onSelect: (e: ValueItem<T> | undefined, automated?: boolean) => void;
    };

export const DropdownInput = React.forwardRef(
    <T,>(
        {
            items = [],
            selectedItem,
            minimumSearchLength = 1,
            maxSuggestionCount = 5,
            onSelect,
            onChangeText,
            onBlur,
            value,
            ...props
        }: DropdownInputProps<T>,
        ref: React.Ref<DefaultTextInput>,
    ) => {
        const [searchValue, setSearchValue] = React.useState(selectedItem?.label ?? value ?? "");
        const [hasFocus, setHasFocus] = React.useState(false);

        React.useEffect(() => {
            setSearchValue(selectedItem?.label ?? value ?? "");
        }, [selectedItem, value]);

        const handleFocus = () => {
            setHasFocus(true);
        };

        const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onChangeText?.(e.nativeEvent.text.trim());

            const existingItem = items.find(item => item.label.toLowerCase() === searchValue.toLowerCase());
            if (existingItem) {
                onSelect?.(existingItem, true);
            }
            setHasFocus(false);
            onBlur?.(e);
        };

        const handleChangeText = (text: string) => {
            setSearchValue(text);
            onChangeText?.(text);

            if (!IsValidString(text)) {
                onSelect?.(undefined, true);
            }
        };

        const showDropdownPanel =
            hasFocus &&
            searchValue.length >= minimumSearchLength &&
            selectedItem?.label.toLowerCase() !== searchValue.toLowerCase();

        return (
            <BaseInput
                {...props}
                ref={ref}
                value={searchValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                autoCorrect={false}
                preventAutoTrim
                panelElement={
                    <DropdownPanel
                        items={items}
                        maxSuggestionCount={maxSuggestionCount}
                        onSelect={onSelect}
                        searchValue={searchValue}
                        visible={showDropdownPanel}
                    />
                }
            />
        );
    },
);

(DropdownInput as React.FunctionComponent).displayName = "DropdownInput";
