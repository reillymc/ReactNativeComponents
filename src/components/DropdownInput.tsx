import React from "react";
import { LayoutRectangle, Pressable, TextInput as DefaultTextInput, View, ViewStyle } from "react-native";

import { IsValidString } from "../helpers";
import { FloatingContainer } from "./FloatingContainer";
import { HighlightedText } from "./HighlightedText";
import { TextInput, TextInputProps } from "./TextInput";

export type DropdownItem = {
    id: string;
    label: string;
};

export interface DropdownInputProps
    extends Pick<
        TextInputProps,
        "autoCapitalize" | "autoCorrect" | "returnKeyType" | "returnKeyLabel" | "onBlur" | "placeholder" | "width"
    > {
    items: Array<DropdownItem>;
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

const DropdownInput = React.forwardRef<DefaultTextInput, DropdownInputProps>(
    (
        { items, selectedItem, minimumSearchLength = 1, maxSuggestionCount = 5, style, onSelect, onAdd, ...props },
        ref,
    ) => {
        const [searchValue, setSearchValue] = React.useState(selectedItem?.label ?? "");
        const [hasFocus, setHasFocus] = React.useState(false);

        const viewRef = React.useRef<View>(null);

        const [layout, setLayout] = React.useState<LayoutRectangle>();

        React.useEffect(() => {
            setSearchValue(selectedItem?.label ?? "");
        }, [selectedItem]);

        const updateValue = (autoSelectHighlighted?: boolean) => {
            if (!IsValidString(searchValue)) {
                onSelect(undefined);
            }

            const item = items.find(({ label }) =>
                autoSelectHighlighted
                    ? label.toLowerCase().includes(searchValue.toLowerCase())
                    : label.toLowerCase() === searchValue.toLowerCase(),
            );
            if (item) {
                onSelect(item);
                return;
            }

            if (onAdd) {
                onAdd(searchValue);
            }
        };

        const handleFocus = () => {
            setHasFocus(true);
        };

        const handleBlur = () => {
            setHasFocus(false);
            updateValue(searchValue.length >= minimumSearchLength);
        };

        const handleChangeText = (text: string) => {
            setSearchValue(text);
        };

        const handleSubmitEditing = () => {
            updateValue(true);
        };

        React.useLayoutEffect(() => {
            if (viewRef.current) {
                viewRef.current.measure((x, y, width, height, px, py) => {
                    setLayout({ x: px ?? x, y: py ?? y, width, height });
                });
            }
        }, [viewRef.current, searchValue]);

        return (
            <>
                <View ref={viewRef} style={{ display: "flex", flexDirection: "column", ...style }}>
                    <TextInput
                        {...props}
                        ref={ref}
                        value={searchValue}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={handleChangeText}
                        onSubmitEditing={handleSubmitEditing}
                        autoCorrect={false}
                    />
                </View>
                {hasFocus && searchValue.length >= minimumSearchLength && (
                    <FloatingContainer
                        position={{ x: layout?.x, y: layout?.y, offsetY: layout?.height }}
                        style={{ marginTop: 5 }}
                    >
                        {items
                            .filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
                            .slice(0, maxSuggestionCount)
                            .map((item, idx) => (
                                <Pressable
                                    key={item.id}
                                    onPress={() => onSelect(item)}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: idx === 0 ? "white" : "#faf2f2",
                                        marginVertical: 2,
                                        padding: 10,
                                    }}
                                >
                                    <HighlightedText text={item.label} highlight={searchValue} />
                                </Pressable>
                            ))}
                    </FloatingContainer>
                )}
            </>
        );
    },
);

DropdownInput.displayName = "DropdownInput";

export { DropdownInput };
