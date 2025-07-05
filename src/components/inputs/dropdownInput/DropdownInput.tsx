import React, { type Ref } from "react";
import type {
    TextInput as DefaultTextInput,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    ViewStyle,
} from "react-native";
import { ValidateString } from "@reillymc/es-utils";

import { useForwardedRef } from "../../../hooks";
import { InputBase, type InputBaseProps } from "../InputBase";
import { InputScaffold, type InputScaffoldProps } from "../InputScaffold";
import type { ValueItem } from "../valueItem";
import { DropdownPanel, type DropdownPanelProps } from "./DropdownPanel";

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
    | "value"
> &
    Pick<
        DropdownPanelProps,
        "hideItemDescriptions" | "searchInDescriptions" | "panelBehaviour"
    > &
    Pick<
        InputScaffoldProps,
        "label" | "helpText" | "mandatory" | "hasError"
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

        style?: ViewStyle;

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
    panelBehaviour,
    onSelect,
    onChangeText,
    onBlur,
    value,
    ref,
    label,
    helpText,
    hasError,
    mandatory,
    ...props
}: DropdownInputProps<T>) => {
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

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onChangeText?.(e.nativeEvent.text.trim());

        const existingItem = items.find(
            (item) => item.label.toLowerCase() === searchValue.toLowerCase(),
        );
        if (existingItem) {
            onSelect?.(existingItem, true);
        }
        setHasFocus(false);
        onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
        setSearchValue(text);
        onChangeText?.(text);

        if (!ValidateString(text)) {
            onSelect?.(undefined, true);
        }
    };

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
            panelAboveElement={
                panelBehaviour === "inlineAbove" ? (
                    <DropdownPanel
                        parentRef={inputRef}
                        items={items}
                        maxSuggestionCount={maxSuggestionCount}
                        onSelect={onSelect}
                        searchValue={searchValue}
                        visible={showDropdownPanel}
                        panelBehaviour={panelBehaviour}
                    />
                ) : undefined
            }
            panelBelowElement={
                panelBehaviour !== "inlineAbove" ? (
                    <DropdownPanel
                        parentRef={inputRef}
                        items={items}
                        maxSuggestionCount={maxSuggestionCount}
                        onSelect={onSelect}
                        searchValue={searchValue}
                        visible={showDropdownPanel}
                        panelBehaviour={panelBehaviour}
                    />
                ) : undefined
            }
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
        </InputScaffold>
    );
};
