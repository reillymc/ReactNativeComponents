import type { FC } from "react";
import { StyleSheet } from "react-native";

import { type ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { InteractionSurface } from "../surface";
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
    active?: boolean;
    onPress: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
    label,
    description,
    searchValue,
    active,
    onPress,
}) => {
    const {
        theme: { color },
    } = useTheme();

    const [styles] = useThemedStyles("menuItem", createStyles);

    return (
        <InteractionSurface
            hitSlop={0}
            onPress={onPress}
            containerStyle={[
                styles.dropdownItem,
                active && { backgroundColor: color.muted },
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
        </InteractionSurface>
    );
};

MenuItem.displayName = "MenuItem";

const createStyles = ({ styles: { menuItem } }: ThemedStyles) =>
    StyleSheet.create({ dropdownItem: menuItem });
