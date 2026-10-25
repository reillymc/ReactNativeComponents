import type { FC } from "react";

import { defineStyles, useComponent } from "../shared";
import { InteractionSurface } from "../surface";
import { HighlightedText } from "../text";

export type MenuItemTheme = {
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
};

export interface MenuItemProps {
    label: string;
    description?: string;
    searchValue?: string;
    highlighted?: boolean;
    onPress: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({
    label,
    description,
    searchValue,
    highlighted,
    onPress,
}) => {
    const { styles } = useComponent("menuItem", { createStyles });

    return (
        <InteractionSurface
            hitSlop={0}
            highlighted={highlighted}
            onPress={onPress}
            style={styles.dropdownItem}
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

const createStyles = defineStyles((theme: MenuItemTheme) => ({
    dropdownItem: {
        paddingHorizontal: theme.paddingHorizontal,
        paddingVertical: theme.paddingVertical,
        borderRadius: theme.borderRadius,
    },
}));
