import { type RefObject, useImperativeHandle, useState } from "react";
import {
    type TextInput as DefaultTextInput,
    StyleSheet,
    type View,
} from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { useComponent } from "../../../internal";
import {
    AnchoredContainer,
    type AnchoredContainerProps,
} from "../../../overlays/anchoredContainer";
import { Menu, MenuItem } from "../../../overlays/menu";
import { InputBase, type InputBaseProps } from "../InputBase";
import type { ValueItem } from "../valueItem";
import { ComboboxBlurGuard } from "./ComboboxBlurGuard";
import { type ComboboxValue, getItemKey } from "./helpers";
import { useComboboxController } from "./useComboboxController";
import { useForwardedRef } from "./useForwardedRef";

export type { ComboboxValue } from "./helpers";

export interface ComboboxInputHandle {
    setInputValue: (text: string) => void;
    clear: () => void;
    open: () => void;
    close: () => void;
    focus: () => void;
    blur: () => void;
}

export type ComboboxInputBaseProps<T = string> = Pick<
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
    | "style"
> & {
    items?: Array<ValueItem<T>>;

    /**
     * The selected item's key. Controlled when supplied; otherwise the
     * component manages selection internally (seed it with `defaultValue`).
     */
    value?: ComboboxValue<T>;

    /** Initial selection for uncontrolled usage. */
    defaultValue?: ComboboxValue<T>;

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
    controllerRef?: RefObject<ComboboxInputHandle | null>;

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

    containerPosition?: AnchoredContainerProps["position"];

    ref?: RefObject<DefaultTextInput | null>;
};

const EMPTY_ITEMS: never[] = [];

export const ComboboxInputBase = <T,>(props: ComboboxInputBaseProps<T>) => {
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

    const { theme } = useComponent("comboboxInput");

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
    } = useComboboxController({
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
                theme={{ parentMargin: theme.panelGap }}
                onInvertedChange={setIsMenuInverted}
            >
                {({ inverted }) => (
                    <ComboboxBlurGuard>
                        <Menu
                            data={filteredItems}
                            reverse={inverted}
                            keyExtractor={(item) => String(getItemKey(item))}
                            renderItem={({ item, index }) => (
                                <MenuItem
                                    label={item.label}
                                    description={item.description}
                                    searchValue={query}
                                    highlighted={index === activeIndex}
                                    onPress={() => selectItem(item)}
                                />
                            )}
                        />
                    </ComboboxBlurGuard>
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
