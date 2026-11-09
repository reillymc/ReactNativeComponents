import { type Ref, useImperativeHandle, useState } from "react";
import {
    Platform,
    type TextInputInstance,
    type ViewInstance,
} from "react-native";
import type { AnimatedRef } from "react-native-reanimated";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent, useForwardedRef } from "../../../internal";
import { Menu, MenuItem } from "../../../overlays";
import {
    AnchoredContainer,
    type AnchoredContainerProps,
} from "../../../overlays/anchoredContainer";
import {
    FieldTextInput,
    type FieldTextInputProps,
    useFieldControlState,
} from "../../field";
import type { ValueItem } from "../valueItem";
import { ComboboxBlurGuard } from "./ComboboxBlurGuard";
import type { ComboboxInputTheme } from "./ComboboxInput.theme";
import { type ComboboxValue, getItemKey } from "./helpers";
import {
    type ComboboxInputChangeDetails,
    type ComboboxSelectBehavior,
    type ComboboxSubmitDetails,
    type ComboboxValueChangeDetails,
    useComboboxController,
} from "./useComboboxController";

export interface ComboboxInputHandle {
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
    | "autoFocus"
    | "style"
> & {
    items?: Array<ValueItem<T>>;

    /**
     * The selected item's key. Controlled when the prop is present; pass
     * `undefined` for an explicit empty selection. Omit the prop for
     * uncontrolled usage.
     */
    value?: ComboboxValue<T>;

    /** Initial selection for uncontrolled usage. */
    defaultValue?: ComboboxValue<T>;

    /**
     * Called when the selection changes with reason `"select"` or
     * `"deselect"`. Custom text is not represented here; it is reported through
     * `onInputChange` and `onSubmit`.
     */
    onChange?: (details: ComboboxValueChangeDetails<T>) => void;

    /**
     * The input text. Controlled when supplied. When controlled, update it
     * from `onInputChange` (including selection and revert events) so the
     * displayed text stays in sync. The component does not write this prop or
     * emit `onInputChange` for external `value` changes; reset `inputValue`
     * alongside `value` when resetting the form.
     */
    inputValue?: string;

    /**
     * Initial input text for uncontrolled usage. Defaults to the selected
     * item's label.
     */
    defaultInputValue?: string;

    /**
     * Called whenever the input text changes: typing, selection, custom-value
     * commits, reverts, and clears.
     */
    onInputChange?: (details: ComboboxInputChangeDetails) => void;

    /**
     * Called on every return-key press, including empty or unchanged
     * selections. Receives the resolved value, so it does not depend on state
     * updates from `onChange`/`onInputChange`.
     */
    onSubmit?: (details: ComboboxSubmitDetails<T>) => void;

    /**
     * Whether Enter also submits when it accepts a highlighted suggestion.
     * Enter already submits when the popup is closed, with custom text, or
     * with an empty value.
     * @default false
     */
    submitOnEnter?: boolean;

    /** Imperative controls (open/close, focus/blur). */
    controllerRef?: Ref<ComboboxInputHandle>;

    /**
     * Whether focusing the input should not open the list of all options.
     * @default false
     */
    disableOpenOnFocus?: boolean;

    /**
     * Whether free-typed values are kept instead of reverting on blur. Custom
     * text is committed on blur/Enter and reported through `onInputChange`
     * and `onSubmit`.
     * @default false
     */
    allowsCustomValue?: boolean;

    /**
     * Controls what happens when an item is selected.
     *
     * - `"blurAndClose"`: close the menu and blur the input.
     * - `"close"`: close the menu and keep focus in the input.
     * - `"keepOpen"`: keep the menu open and keep focus in the input.
     * @default "blurAndClose"
     */
    selectBehavior?: ComboboxSelectBehavior;

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

    menuMount?: AnchoredContainerProps["mount"];

    /** Called when the visibility of the suggestions panel changes. */
    onMenuVisibilityChange?: (visible: boolean) => void;

    /**
     * Anchor for the iOS overlay and inline measurement. When omitted, iOS
     * falls back to the inline mount, which can clip inside scrollable or
     * clipped parents.
     */
    anchorRef?: AnimatedRef<ViewInstance>;

    theme?: DeepPartial<ComboboxInputTheme>;

    ref?: Ref<TextInputInstance>;
};

type WebPressHandlers = {
    onMouseDown: () => void;
};

const EMPTY_ITEMS: never[] = [];

export const ComboboxInputBase = <T,>(props: ComboboxInputBaseProps<T>) => {
    const {
        items = EMPTY_ITEMS,
        value,
        defaultValue,
        inputValue,
        defaultInputValue,
        onChange,
        onInputChange,
        onSubmit,
        submitOnEnter = false,
        selectBehavior = "blurAndClose",
        controllerRef,
        disableOpenOnFocus = false,
        allowsCustomValue = false,
        filterItems,
        minimumSearchLength = 1,
        maxSuggestionCount,
        containerPosition,
        anchorRef,
        menuMount = "overlay",
        onMenuVisibilityChange,
        theme: themeOverrides,
        onBlur,
        onFocus,
        onKeyPress,
        ref,
        ...inputProps
    } = props;

    const isValueControlled = "value" in props;
    const isInputControlled = "inputValue" in props;
    const { interactive } = useFieldControlState();

    const inputRef = useForwardedRef(ref);
    const [isMenuInverted, setIsMenuInverted] = useState(false);
    const { theme } = useComponent("comboboxInput", { themeOverrides });

    const singleLineHeight =
        theme.option.paddingVertical * 2 + theme.option.lineHeight.label;
    const descriptionHeight =
        singleLineHeight + theme.option.lineHeight.description;

    const hasDescriptionLines = items.some(
        (item) => item.description !== undefined && item.description !== "",
    );

    const optionHeight = hasDescriptionLines
        ? descriptionHeight
        : singleLineHeight;

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
        open,
        close,
        handlePress,
    } = useComboboxController({
        items,
        value,
        defaultValue,
        isValueControlled,
        inputValue,
        defaultInputValue,
        isInputControlled,
        interactive,
        onChange,
        onInputChange,
        onSubmit,
        onFocus,
        onBlur,
        onKeyPress,
        onMenuVisibilityChange,
        selectBehavior,
        disableOpenOnFocus,
        allowsCustomValue,
        submitOnEnter,
        filterItems,
        minimumSearchLength,
        maxSuggestionCount,
        inputRef,
        isMenuInverted,
    });

    const pressHandlers =
        Platform.OS === "web"
            ? ({
                  onMouseDown: handlePress,
              } as WebPressHandlers as FieldTextInputProps)
            : {
                  onPressIn: handlePress,
              };

    useImperativeHandle(
        controllerRef,
        () => ({
            open,
            close,
            focus: () => interactive && inputRef.current?.focus(),
            blur: () => inputRef.current?.blur(),
        }),
        [open, close, interactive, inputRef],
    );

    return (
        <>
            <FieldTextInput
                {...inputProps}
                {...pressHandlers}
                ref={inputRef}
                theme={theme.input}
                value={displayText}
                submitBehavior="submit"
                // Required to support web selecting with enter but not blurring
                blurOnSubmit={false}
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
                mount={menuMount}
                show={showContainer}
                position={containerPosition}
                theme={theme.panel}
                onInvertedChange={setIsMenuInverted}
            >
                {({ inverted }) => (
                    <ComboboxBlurGuard>
                        <Menu
                            theme={theme.menu}
                            data={filteredItems}
                            activeIndex={activeIndex}
                            reverse={inverted}
                            scrollResetKey={query}
                            getItemLayout={(_data, index) => ({
                                length: optionHeight,
                                offset:
                                    theme.menu.padding +
                                    index * (optionHeight + theme.menu.gap),
                                index,
                            })}
                            keyExtractor={(item) => String(getItemKey(item))}
                            renderItem={({ item, index }) => (
                                <MenuItem
                                    label={item.label}
                                    description={item.description}
                                    searchValue={query}
                                    highlighted={index === activeIndex}
                                    truncate
                                    height={optionHeight}
                                    onPress={() => selectItem(item)}
                                    theme={theme.option}
                                />
                            )}
                        />
                    </ComboboxBlurGuard>
                )}
            </AnchoredContainer>
        </>
    );
};
