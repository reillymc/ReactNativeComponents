import { type RefObject, useImperativeHandle, useState } from "react";
import {
    type TextInput as DefaultTextInput,
    StyleSheet,
    type View,
} from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import type { ValueItem } from "../../../common";
import {
    type ThemedStyles,
    useForwardedRef,
    useThemedStyles,
} from "../../../hooks";
import {
    AnchoredContainer,
    type AnchoredContainerProps,
} from "../../container";
import { Menu, MenuItem } from "../../menu";
import { InputBase, type InputBaseProps } from "../InputBase";
import { DropdownBlurGuard } from "./DropdownBlurGuard";
import { type DropdownValue, getItemKey } from "./helpers";
import { useDropdownController } from "./useDropdownController";

export type { DropdownValue } from "./helpers";

export interface DropdownInputHandle {
    setInputValue: (text: string) => void;
    clear: () => void;
    open: () => void;
    close: () => void;
    focus: () => void;
    blur: () => void;
}

export type DropdownInputBaseProps<T = string> = Pick<
    InputBaseProps,
    | "autoCapitalize"
    | "returnKeyType"
    | "returnKeyLabel"
    | "onBlur"
    | "onFocus"
    | "onKeyPress"
    | "placeholder"
    | "clearButtonMode"
    | "maxLength"
    | "onSubmitEditing"
    | "autoFocus"
    | "disabled"
    | "variant"
    | "inputStyle"
> & {
    items?: Array<ValueItem<T>>;

    /**
     * The selected item's key. Controlled when supplied; otherwise the
     * component manages selection internally (seed it with `defaultValue`).
     */
    value?: DropdownValue<T>;

    /** Initial selection for uncontrolled usage. */
    defaultValue?: DropdownValue<T>;

    /**
     * Called when the selection changes. The item is `undefined` for a custom
     * (free-typed) value; `inputValue` is always the current input text.
     */
    onChange?: (item: ValueItem<T> | undefined, inputValue: string) => void;

    /**
     * Notification for text changes: user typing, imperative set/clear, and
     * reverts to the selected label on blur/escape. Not called on selection
     * (use `onChange` for that).
     */
    onChangeText?: (text: string) => void;

    /** Imperative controls (set text, clear, open/close, focus/blur). */
    controllerRef?: RefObject<DropdownInputHandle | null>;

    /**
     * Whether focusing the input opens the list of all options.
     * @default true
     */
    openOnFocus?: boolean;

    /**
     * Whether free-typed values that don't match an item are kept and reported
     * through `onChange` (rather than reverting to the selected item on blur).
     * @default false
     */
    allowsCustomValue?: boolean;

    /**
     * Whether selecting an item blurs (and closes) the input.
     * @default true
     */
    blurOnSelect?: boolean;

    /** Overrides the default label/description matching. */
    filterItems?: (item: ValueItem<T>, query: string) => boolean;

    /**
     * Minimum number of characters required before typed suggestions appear.
     * @default 1
     */
    minimumSearchLength?: number;

    /** Optional cap on the number of rendered items. */
    maxSuggestionCount?: number;

    /**
     * Maximum height of the dropdown container. When items overflow the
     * container becomes scrollable. Defaults to the themed `menu.maxHeight`.
     */
    maxContainerHeight?: number;

    containerPosition?: AnchoredContainerProps["position"];

    ref?: RefObject<DefaultTextInput | null>;
};

const EMPTY_ITEMS: never[] = [];

export const DropdownInputBase = <T,>(props: DropdownInputBaseProps<T>) => {
    const {
        items = EMPTY_ITEMS,
        value,
        defaultValue,
        onChange,
        onChangeText,
        controllerRef,
        openOnFocus = true,
        allowsCustomValue = false,
        blurOnSelect = true,
        filterItems,
        minimumSearchLength = 1,
        maxSuggestionCount,
        maxContainerHeight,
        containerPosition,
        disabled: disabledProp,
        onBlur,
        onFocus,
        onKeyPress,
        onSubmitEditing,
        ref,
        ...inputProps
    } = props;

    const isValueControlled = "value" in props;
    const disabled = disabledProp || !onChange;

    const inputRef = useForwardedRef(ref);
    const anchorRef = useAnimatedRef<View>();
    const [isMenuInverted, setIsMenuInverted] = useState(false);

    const [{ containerGap }] = useThemedStyles(
        "dropdownInput",
        ({ styles: { dropdownInput } }: ThemedStyles) => ({
            containerGap: dropdownInput.panelGap,
        }),
    );
    const [{ menuMaxHeight }] = useThemedStyles(
        "menu",
        ({ styles: { menu } }: ThemedStyles) => ({
            menuMaxHeight: menu.maxHeight,
        }),
    );

    const {
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
        open,
        close,
    } = useDropdownController({
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
    });

    useImperativeHandle(
        controllerRef,
        () => ({
            setInputValue,
            clear,
            open,
            close,
            focus: () => inputRef.current?.focus(),
            blur: () => inputRef.current?.blur(),
        }),
        [setInputValue, clear, open, close, inputRef],
    );

    return (
        <Animated.View
            ref={anchorRef}
            collapsable={false}
            style={styles.anchor}
        >
            <InputBase
                {...inputProps}
                ref={inputRef}
                disabled={disabled}
                value={displayText}
                submitBehavior="submit"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                onSubmitEditing={handleSubmitEditing}
                onChangeText={handleChangeText}
                autoCorrect={false}
                spellCheck={false}
            />
            <AnchoredContainer
                parentRef={inputRef}
                anchorRef={anchorRef}
                show={showContainer}
                position={containerPosition}
                gap={containerGap}
                onInvertedChange={setIsMenuInverted}
            >
                {({ inverted, maxHeight }) => (
                    <DropdownBlurGuard>
                        <Menu
                            data={filteredItems}
                            reverse={inverted}
                            maxHeight={Math.min(
                                maxContainerHeight ?? menuMaxHeight,
                                maxHeight,
                            )}
                            keyExtractor={(item) => String(getItemKey(item))}
                            renderItem={({ item, index }) => (
                                <MenuItem
                                    label={item.label}
                                    description={item.description}
                                    searchValue={query}
                                    active={index === activeIndex}
                                    onPress={() => selectItem(item)}
                                />
                            )}
                        />
                    </DropdownBlurGuard>
                )}
            </AnchoredContainer>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    anchor: {
        alignSelf: "stretch",
    },
});
