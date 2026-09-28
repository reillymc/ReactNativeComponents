import type { FC } from "react";
import { StyleSheet } from "react-native";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { ActionBase } from "../action";
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

    const [styles] = useThemedStyles("menuItem", createStyles);

    return (
        <ActionBase
            hitSlop={0}
            onPress={onPress}
            containerStyle={({ pressed }) => [
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
        </ActionBase>
    );
};

MenuItem.displayName = "MenuItem";

const createStyles = ({ styles: { menuItem } }: ThemedStyles) =>
    StyleSheet.create({ dropdownItem: menuItem });
