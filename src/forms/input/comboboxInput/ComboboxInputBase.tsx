import { type Ref, useImperativeHandle, useState } from "react";
import type { TextInput as DefaultTextInput, View } from "react-native";
import type { AnimatedRef } from "react-native-reanimated";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent, useForwardedRef } from "../../../internal";
import {
    AnchoredContainer,
    type AnchoredContainerProps,
} from "../../../overlays/anchoredContainer";
import { Menu, MenuItem } from "../../../overlays/menu";
import {
    FieldTextInput,
    type FieldTextInputProps,
    useFieldControlState,
} from "../../field";
import type { ValueItem } from "../valueItem";
import { ComboboxBlurGuard } from "./ComboboxBlurGuard";
import type { ComboboxInputTheme } from "./ComboboxInput.theme";
import { type ComboboxValue, getItemKey } from "./helpers";
import { useComboboxController } from "./useComboboxController";

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
    FieldTextInputProps,
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
    controllerRef?: Ref<ComboboxInputHandle>;

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

    /**
     * Anchor for the iOS overlay. When omitted, iOS falls back to the inline
     * mount, which can clip inside scrollable or clipped parents.
     */
    anchorRef?: AnimatedRef<View>;

    theme?: DeepPartial<ComboboxInputTheme>;

    ref?: Ref<DefaultTextInput>;
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
        anchorRef,
        theme: themeOverrides,
        onBlur,
        onFocus,
        onKeyPress,
        onSubmitEditing,
        ref,
        ...inputProps
    } = props;

    const isValueControlled = "value" in props;
    const { interactive } = useFieldControlState();

    const inputRef = useForwardedRef(ref);
    const [isMenuInverted, setIsMenuInverted] = useState(false);
    const { theme } = useComponent("comboboxInput", { themeOverrides });

    const {
        displayText,
        query,
        filteredItems,
        showContainer,
        activeIndex,
        handleFocus,
        handleBlur,
        handleKeyPress,
        handleSubmitEditing,
        selectItem,
        updateInputText,
        clear,
        open,
        close,
    } = useComboboxController({
        items,
        value,
        defaultValue,
        isValueControlled,
        interactive,
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
            setInputValue: updateInputText,
            clear,
            open,
            close,
            focus: () => interactive && inputRef.current?.focus(),

            blur: () => inputRef.current?.blur(),
        }),
        [updateInputText, clear, open, close, interactive, inputRef],
    );

    return (
        <>
            <FieldTextInput
                {...inputProps}
                ref={inputRef}
                theme={theme.textInput}
                value={displayText}
                submitBehavior="submit"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                onSubmitEditing={handleSubmitEditing}
                onChangeText={updateInputText}
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
                            activeIndex={activeIndex}
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
        </>
    );
};
