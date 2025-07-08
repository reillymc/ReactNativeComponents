import type { FC } from "react";
import { Pressable, StyleSheet } from "react-native";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { HighlightedText } from "../text";

export type MenuItemStyles = {
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
};

export interface MenuItemProps {
    label: string;
    description?: string;
    searchValue?: string;
    onPress: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
    label,
    description,
    searchValue,
    onPress,
}) => {
    const {
        theme: { color },
    } = useTheme();

    const styles = useThemedStyles(createStyles, {});

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.dropdownItem,
                pressed && { backgroundColor: color.pressOverlay },
            ]}
        >
            <HighlightedText text={label} highlight={searchValue} />
            {!!description && (
                <HighlightedText
                    variant="caption"
                    text={description}
                    highlight={searchValue}
                />
            )}
        </Pressable>
    );
};

MenuItem.displayName = "MenuItem";

const createStyles = ({ styles: { menuItem } }: ThemedStyles) =>
    StyleSheet.create({ dropdownItem: menuItem });
